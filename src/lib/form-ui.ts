export type ConsultUiState = 'empty' | 'error' | 'submitting' | 'success' | 'fail';

export type ConsultUiEvent =
  | { type: 'submit'; valid: boolean }
  | { type: 'resolved'; ok: boolean }
  | { type: 'retry' };

export function reduceConsultUi(state: ConsultUiState, event: ConsultUiEvent): ConsultUiState {
  if (event.type === 'submit') {
    if (state === 'submitting' || state === 'success') return state;
    return event.valid ? 'submitting' : 'error';
  }
  if (event.type === 'resolved') {
    if (state !== 'submitting') return state;
    return event.ok ? 'success' : 'fail';
  }
  return state === 'fail' ? 'empty' : state;
}
