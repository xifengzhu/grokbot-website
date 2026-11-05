/** Product flags. NBA, Partner claims, and ads-team copy stay off unless a later PRD change turns them on. */
export const flags = {
  showNba: false,
  showPartner: false,
  showAdsTeam: false,
} as const;

export function showNbaTrust(): boolean {
  return flags.showNba;
}
