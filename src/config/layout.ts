/**
 * About section layout.
 *
 *   'explorer' — bio and skills shown as file-explorer windows (folders + files)
 *   'classic'  — bio card + photo, and the skills bento grid
 *
 * To revert to the previous design, change this to 'classic'. Certifications are cards in both.
 */
export const ABOUT_LAYOUT: 'explorer' | 'classic' = 'explorer';

/**
 * Portfolio chat assistant (bottom-right bubble). Scripted answers from the site's own
 * content, plus section navigation; no AI service. Set to false to remove it.
 */
export const CHAT_ENABLED = true;

/**
 * Let the chat use the real AI (Groq, through the Netlify function in netlify/functions/chat.mjs).
 * The scripted bot is always the fallback. Set to false to use only the scripted bot.
 */
export const CHAT_AI_ENABLED = true;
