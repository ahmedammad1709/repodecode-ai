#!/usr/bin/env node
/**
 * Environment Variables Verification Script
 * Run this to verify all required environment variables are set correctly
 * 
 * Usage:
 *   npm run verify:env
 *   bun verify-env.ts
 */

import * as fs from "fs";
import * as path from "path";

const envPath = path.join(process.cwd(), ".env.local");
const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
  "GITHUB_WEBHOOK_SECRET",
  "SUPABASE_SERVICE_ROLE_KEY",
];

const optionalVars = [
  "VITE_GITHUB_CLIENT_ID",
  "VITE_GITHUB_CLIENT_SECRET",
];

function readEnv(): Record<string, string> {
  if (!fs.existsSync(envPath)) {
    console.error(`❌ .env.local not found at ${envPath}`);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf-8");
  const env: Record<string, string> = {};

  envContent.split("\n").forEach((line: string) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const [key, ...valueParts] = trimmed.split("=");
    if (key) {
      env[key.trim()] = valueParts.join("=").trim();
    }
  });

  return env;
}

function maskValue(value: string, showChars = 4): string {
  if (!value) return "[EMPTY]";
  if (value.length <= showChars) return "*".repeat(value.length);
  return value.substring(0, showChars) + "*".repeat(value.length - showChars);
}

function validateSupabase(url: string): boolean {
  return url.startsWith("https://") && url.includes(".supabase.co");
}

function validateKey(key: string): boolean {
  return key.length > 20 && !key.includes("your-");
}

function main() {
  console.log("\n🔍 RepoDecodeAI Environment Variables Verification\n");
  console.log("================================================\n");

  const env = readEnv();

  let allValid = true;

  console.log("📋 REQUIRED VARIABLES:\n");
  requiredVars.forEach((varName) => {
    const value = env[varName];
    const hasValue = !!value && !value.includes("your-");
    const status = hasValue ? "✅" : "❌";

    console.log(`${status} ${varName}`);

    if (!hasValue) {
      allValid = false;
      console.log(`   ❌ Missing or placeholder value\n`);
      return;
    }

    // Additional validation
    if (varName === "NEXT_PUBLIC_SUPABASE_URL") {
      const isValid = validateSupabase(value);
      if (!isValid) {
        console.log(`   ⚠️  Invalid Supabase URL format\n`);
        allValid = false;
        return;
      }
    }

    if (
      varName.includes("KEY") ||
      varName.includes("SECRET") ||
      varName.includes("TOKEN")
    ) {
      const isValid = validateKey(value);
      if (!isValid) {
        console.log(`   ⚠️  Key appears to be invalid format\n`);
        allValid = false;
        return;
      }
      console.log(`   Value: ${maskValue(value)}\n`);
      return;
    }

    console.log(`   Value: ${maskValue(value)}\n`);
  });

  console.log("\n📋 OPTIONAL VARIABLES:\n");
  optionalVars.forEach((varName) => {
    const value = env[varName];
    const hasValue = !!value && !value.includes("your-");
    const status = hasValue ? "✅" : "ℹ️  ";

    console.log(`${status} ${varName}`);
    if (hasValue) {
      console.log(`   Value: ${maskValue(value)}\n`);
    } else {
      console.log(`   (Optional - not set)\n`);
    }
  });

  console.log("================================================\n");

  if (allValid) {
    console.log("✅ All required environment variables are correctly set!\n");
    console.log("📌 Next Steps:");
    console.log("   1. Deploy these variables to Vercel Production");
    console.log("   2. Test webhook with a push to your GitHub repo");
    console.log("   3. Check Vercel logs to confirm webhook received\n");
    process.exit(0);
  } else {
    console.log("❌ Some environment variables are missing or invalid.\n");
    console.log("📌 Required Setup:");
    console.log("   1. Get GITHUB_WEBHOOK_SECRET from GitHub OAuth App");
    console.log("   2. Get SUPABASE_SERVICE_ROLE_KEY from Supabase Settings");
    console.log("   3. Add both to .env.local and Vercel environment");
    console.log("   4. See WEBHOOK_SETUP.md for detailed instructions\n");
    process.exit(1);
  }
}

main();
