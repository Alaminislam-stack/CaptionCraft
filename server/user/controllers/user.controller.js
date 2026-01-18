import { OAuth2Client } from "google-auth-library";
import { asyncHandler } from "../utils/asyncHedler.js";
import { sql } from "drizzle-orm";
import { errorHandler } from "../utils/errorHendler.js";
import { users } from "../config/db/schema.js";
import { db } from "../config/db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import axios from "axios";

export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new errorHandler("All fields are required", 400));
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new errorHandler("Please provide a valid email address", 400));
    }

    // Password length validation
    if (password.length < 6) {
        return next(
            new errorHandler("Password must be at least 6 characters long", 400)
        );
    }

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
    if (existingUser.length > 0) {
        return next(new errorHandler("User already exists", 400));
    }

    const credits = 10;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
        .insert(users)
        .values({
            name,
            email,
            password: hashedPassword,
            credits,
        })
        .returning({
            id: users.id,
            name: users.name,
            email: users.email,
            plan: users.plan,
            credits: users.credits,
        });


    const token = jwt.sign(
        { id: newUser[0].id, email: newUser[0].email },
        process.env.JWT_SECRET || "your-secret-key-change-this",
        { expiresIn: "7d" }
    );


    const { password: _, ...userWithoutPassword } = newUser[0];

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userWithoutPassword,
        token,
    });
});

export const loginAndRegisterWithGoogle = asyncHandler(
    async (req, res, next) => {
        const { credential, clientId } = req.body;
        console.log(credential, clientId);
        const client = new OAuth2Client(clientId);
        if (!credential || !clientId) {
            return next(new errorHandler("Please provide all required", 400));
        }
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        const { email, given_name, family_name } = payload;
        // Validation

        // Check if user exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            const token = jwt.sign(
                { id: existingUser[0].id, email: existingUser[0].email },
                process.env.JWT_SECRET || "your-secret-key-change-this",
                { expiresIn: "7d" }
            );

            // Set cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });

            // Send response (exclude password)
            const { password: _, ...userWithoutPassword } = existingUser[0];

            return res.status(200).json({
                success: true,
                message: "User login successfully",
                user: userWithoutPassword,
                token,
            });
        }

        const credits = 10;

        const newUser = await db
            .insert(users)
            .values({ name: given_name + " " + family_name, email, credits })
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
                plan: users.plan,
                credits: users.credits,
            });

        const token = jwt.sign(
            { id: newUser[0].id, email: newUser[0].email },
            process.env.JWT_SECRET || "your-secret-key-change-this",
            { expiresIn: "7d" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userWithoutPassword,
            token,
        });
    }
);

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler("All fields are required", 400));
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new errorHandler("Please provide a valid email address", 400));
    }

    // Password length validation
    if (password.length < 6) {
        return next(
            new errorHandler("Password must be at least 6 characters long", 400)
        );
    }

    // Use db.query API with usersRelations to fetch user and shops together
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!existingUser) {
        return next(new errorHandler("User not found", 400));
    }

    const isMach = await bcrypt.compare(password, existingUser.password);
    if (!isMach) {
        return next(new errorHandler("User Not Found", 404));
    }

    const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET || "your-secret-key-change-this",
        { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });

    const { password: _, ...userWithoutPassword } = existingUser;

    res.status(200).json({
        success: true,
        message: "User login successfully",
        user: userWithoutPassword,
        token,
    });
});

export const profile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    let user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });

    if (!user) {
        return next(new errorHandler("User not found", 400));
    }

    // Refill logic for FREE plan
    const now = new Date();
    const lastRefill = new Date(user.lastRefillAt);
    if (user.plan === "FREE" && now.toDateString() !== lastRefill.toDateString()) {
        await db.update(users)
            .set({
                credits: 10,
                lastRefillAt: now,
                captionsUsedToday: 0
            })
            .where(eq(users.id, userId));
        user.credits = 10;
        user.captionsUsedToday = 0;
    }

    const response = await axios.post(`${process.env.CAPTION_API}/captions`, {
        userId
    });

    if (!response.data.success) {
        return next(new errorHandler(response.data.errorMessage || "Failed to get captions", 400));
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
        success: true,
        message: "User profile successfully",
        user: userWithoutPassword,
        captions: response.data.captions,
    });
});

export const logout = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });
    if (!user) {
        return next(new errorHandler("User not found", 400));
    }
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 0,
    });
    res.status(200).json({
        success: true,
        message: "User logout successfully",
    });
});

export const deductCredits = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return next(new errorHandler("User ID is required", 400));
    }

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId));

    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    // Refill logic for FREE plan
    const now = new Date();
    const lastRefill = new Date(user.lastRefillAt);
    let currentCredits = user.credits;

    if (user.plan === "FREE" && now.toDateString() !== lastRefill.toDateString()) {
        await db.update(users)
            .set({
                credits: 10,
                lastRefillAt: now,
                captionsUsedToday: 0
            })
            .where(eq(users.id, userId));
        currentCredits = 10;
    }

    if (currentCredits < 1) {
        return next(new errorHandler("Insufficient credits", 400));
    }

    await db
        .update(users)
        .set({
            credits: sql`${users.credits} - 1`,
            captionsUsedToday: sql`${users.captionsUsedToday} + 1`,
        })
        .where(eq(users.id, userId));

    res.status(200).json({
        success: true,
        message: "Credits deducted successfully",
    });
});