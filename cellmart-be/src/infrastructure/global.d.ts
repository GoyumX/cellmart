export {};

// Create a type for the roles
export type Role = "admin";

// Extend Express Request interface to include auth property
declare global {
  namespace Express {
      interface Request {
          auth?: {
              userId: string;
              sessionClaims?: {
                  metadata: {
                      role?: "admin";
                  };
              };
          };
      }
  }
}