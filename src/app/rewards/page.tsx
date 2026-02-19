import { createClient } from "@/lib/supabase/server"
import RewardsView from "@/features/rewards/components/RewardsView"

export default async function RewardsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let points = 0

  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('points')
      .eq('id', user.id)
      .single()

    if (profile) {
      points = profile.points || 0
    }
  }

  return <RewardsView userPoints={points} />
}
