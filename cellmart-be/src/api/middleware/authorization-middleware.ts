import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../../domain/errors/forbidden-error";
import { clerkClient } from "@clerk/express";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req?.auth?.userId) {
            throw new ForbiddenError("User not authenticated");
        }

        const user = await clerkClient.users.getUser(req.auth.userId);
        
        const userRole = user.publicMetadata?.role || 
                        user.privateMetadata?.role || 
                        user.unsafeMetadata?.role;
        
        console.log("User metadata:", {
            userId: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            publicMetadata: user.publicMetadata,
            privateMetadata: user.privateMetadata,
            unsafeMetadata: user.unsafeMetadata,
            foundRole: userRole
        });
        
        if (userRole !== "admin") {
            throw new ForbiddenError(`Admin access required. User role: ${userRole || 'none'}`);
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        if (error instanceof ForbiddenError) {
            next(error);
        } else {
            console.error("Clerk API error details:", error);
            next(new ForbiddenError("Failed to verify user permissions"));
        }
    }
}