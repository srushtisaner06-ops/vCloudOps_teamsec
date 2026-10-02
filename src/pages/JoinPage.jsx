import PortalShell from '../components/apply/PortalShell'
import JoinSection from '../components/join/JoinSection'

/** "Join Us" page: recruitment hero, countdown and domain cards. Apply leads to the form. */
export default function JoinPage() {
  return (
    <PortalShell showCountdown={false} backHref="#home" backLabel="Back to vCloudOps home">
      <JoinSection standalone />
    </PortalShell>
  )
}
