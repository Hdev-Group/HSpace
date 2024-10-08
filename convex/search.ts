import { query } from "./_generated/server"
import { v } from "convex/values"

export const search = query({
    args: {
        searchString: v.string() // This ensures that searchString is validated
    },
    handler: async (ctx, searchString) => {
        if (!searchString || typeof searchString !== 'string') {
            return [];
        }

        // Clean up the search string
        const cleanSearchString = searchString.trim().toLowerCase();
        console.log(`Cleaned Search String: ${cleanSearchString}`);

        // Fetch all users and log what you're getting
        const users = await ctx.db.query("users")
            .withIndex("byName", (q) => q) // Fetch users indexed by 'name'
            .collect();
        
        console.log('Fetched Users:', users);

        // Filter users locally for a case-insensitive and trimmed match
        const filteredUsers = users.filter(user => 
            user._id.toLowerCase().trim().includes(cleanSearchString)
        );

        console.log('Filtered Users:', filteredUsers);

        return filteredUsers;
    }
});
