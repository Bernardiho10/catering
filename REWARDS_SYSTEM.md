# The A Cake - Rewards System Documentation

## Philosophy
At **The A Cake**, we believe in sharing the blessing. Our rewards system is designed to give back a fraction of every purchase to our loyal customers, ensuring they feel appreciated and keep coming back for more.

## Point Calculation Logic

### 1. Earning Points
- **Standard Rate**: Customers earn **10 points for every $1 spent**.
- **Calculation**: `Points = Floor(Subtotal * 10)`
  - *Example*: A $35 order earns 350 points.
- **Organic Bonus**: Orders consisting entirely of "Organic" labeled items earn a **10% bonus** on points.
  - *Example*: A $35 organic-only order earns 385 points.

### 2. Point Value (The "Fraction" Back)
- **Value**: 100 points = **$0.50** in value.
- **Cashback Equivalent**: This equates to a **5% effective give-back** rate.
- **Redemption Tiers**:
  - **500 Points**: $2.50 off
  - **1000 Points**: $5.00 off
  - **2000 Points**: $10.00 off
  - **5000 Points**: Free "Family Blessing" Bundle ($25 value)

### 3. Lifecycle
- Points are added to the user's account once an order is marked as `Delivered`.
- Points expire after 12 months of inactivity to keep our business sustainable while rewarding active customers.

## Technical Implementation
- Points are stored in the `users.points` column in Supabase.
- A background trigger or edge function will handle point additions after successful payment/delivery.
- The `src/lib/rewards.ts` file handles the frontend calculation and display logic.
