#!/bin/bash
# Agentic Commerce Toolkit - One-Click GitHub Publisher
# Built by DeepLumen (http://www.deeplumen.com)
#
# Usage: ./publish.sh

set -e

REPO_NAME="agentic-commerce-toolkit"
REPO_DESC="Open-source toolkit for Agentic Commerce. Make your Shopify store AI-ready for ChatGPT, Claude, and other AI agents. Built by DeepLumen."
REPO_TOPICS="agentic-commerce,llms-txt,shopify,chatgpt,ai-seo,geo-optimization,schema-org,ocp-protocol,m2ai,ai-agents,ecommerce,structured-data,gptbot,claude-ai"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Agentic Commerce Toolkit - Publishing to GitHub${NC}"
echo -e "${BLUE}  http://www.deeplumen.com${NC}"
echo -e "${BLUE}======================================================${NC}"
echo ""

# Step 1: Check gh CLI
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}GitHub CLI (gh) is not installed.${NC}"
    echo "Install it with: brew install gh"
    echo ""
    read -p "Install now via Homebrew? (y/n): " install_gh
    if [ "$install_gh" = "y" ]; then
        brew install gh
    else
        echo -e "${RED}Cannot continue without gh. Exiting.${NC}"
        exit 1
    fi
fi

# Step 2: Check auth
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}You're not logged into GitHub.${NC}"
    echo "Opening login flow..."
    gh auth login
fi

GH_USER=$(gh api user --jq .login)
echo -e "${GREEN}Logged in as: $GH_USER${NC}"
echo ""

# Step 3: Check git status
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Git not initialized. Initializing now...${NC}"
    git init -b main
    git add .
    git commit -m "Initial release: Agentic Commerce Toolkit v1.0"
fi

# Step 4: Create the repo
echo -e "${BLUE}Creating repository: $GH_USER/$REPO_NAME${NC}"

if gh repo view "$GH_USER/$REPO_NAME" &> /dev/null; then
    echo -e "${YELLOW}Repository already exists.${NC}"
    read -p "Push to existing repo? (y/n): " push_existing
    if [ "$push_existing" != "y" ]; then
        echo "Aborted."
        exit 0
    fi
else
    gh repo create "$REPO_NAME" \
        --public \
        --description "$REPO_DESC" \
        --homepage "http://www.deeplumen.com" \
        --source=. \
        --remote=origin
    echo -e "${GREEN}Repository created!${NC}"
fi

# Step 5: Push
echo -e "${BLUE}Pushing code...${NC}"
if ! git remote get-url origin &> /dev/null; then
    git remote add origin "https://github.com/$GH_USER/$REPO_NAME.git"
fi
git push -u origin main

# Step 6: Add topics
echo -e "${BLUE}Adding SEO topics...${NC}"
gh repo edit "$GH_USER/$REPO_NAME" --add-topic agentic-commerce,llms-txt,shopify,chatgpt,ai-seo,geo-optimization,schema-org,ocp-protocol,m2ai,ai-agents,ecommerce,structured-data,gptbot,claude-ai 2>/dev/null || \
    echo -e "${YELLOW}(Topics may need to be set manually if this fails)${NC}"

# Step 7: Enable Pages
echo -e "${BLUE}Enabling GitHub Pages (Actions source)...${NC}"
gh api -X POST "repos/$GH_USER/$REPO_NAME/pages" \
    -f "build_type=workflow" 2>/dev/null || \
    echo -e "${YELLOW}(Enable GitHub Pages manually: Settings > Pages > Source: GitHub Actions)${NC}"

# Done
echo ""
echo -e "${GREEN}======================================================${NC}"
echo -e "${GREEN}  Done! Your repo is live at:${NC}"
echo -e "${GREEN}  https://github.com/$GH_USER/$REPO_NAME${NC}"
echo -e "${GREEN}======================================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Visit your repo and verify topics are set"
echo "  2. Wait ~2 min for GitHub Pages to deploy"
echo "  3. Pin this repo to your profile (Profile > Customize)"
echo "  4. Share on Reddit r/Shopify, Hacker News, Twitter"
echo ""
echo "Live URL will be: https://$GH_USER.github.io/$REPO_NAME/"
echo ""
echo "Learn more about Agentic Commerce: http://www.deeplumen.com"
