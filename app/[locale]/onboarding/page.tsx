import { getUserProfile } from '@/lib/profiles';
import { OnboardingClient } from './onboarding-client';

export default async function OnboardingPage() {
  const profile = await getUserProfile();
  const userName = profile?.full_name || '';

  return <OnboardingClient initialName={userName} />;
}
