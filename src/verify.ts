export type VerificationResult = {
  valid: boolean;
  message?: string;
};

export const verifyPassword = (password: string): VerificationResult => {
  if (password.length < 7) {
    return {
      valid: false,
      message: "Password must be at least 7 characters long",
    };
  }

  if (password.length > 15) {
    return {
      valid: false,
      message: "Password must be less than 15 characters long",
    };
  }

  if (!password.match(/[a-z]/)) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  if (!password.match(/[A-Z]/)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (!password.match(/[0-9]/)) {
    return {
      valid: false,
      message: "Password must contain at least one number",
    };
  }

  if (!password.match(/[^a-zA-Z0-9]/)) {
    return {
      valid: false,
      message: "Password must contain at least one special character",
    };
  }

  if (password.match(/\s/)) {
    return {
      valid: false,
      message: "Password must not contain whitespace",
    };
  }

  return { valid: true };
};

export const verifyUsername = (username: string): VerificationResult => {
  if (username.length < 3) {
    return {
      valid: false,
      message: "Username must be at least 3 characters long",
    };
  }

  if (username.length > 12) {
    return {
      valid: false,
      message: "Username must be less than 12 characters long",
    };
  }

  if (!username.match(/^[a-zA-Z0-9_.]+$/)) {
    return {
      valid: false,
      message:
        "Username must only contain letters, numbers, underscores, and periods",
    };
  }

  if (!username.match(/^[a-zA-Z]/)) {
    return {
      valid: false,
      message: "Username must start with a letter",
    };
  }

  return { valid: true };
};

export const verifyEmail = (email: string): VerificationResult => {
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return {
      valid: false,
      message: "Email must be valid",
    };
  }

  return { valid: true };
};
