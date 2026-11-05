import { describe, expect, it } from 'vitest';
import { reduceConsultUi, type ConsultUiState } from '../src/lib/form-ui';

describe('consult form UI state', () => {
  it('starts empty and shows a validation error without entering submitting', () => {
    const next = reduceConsultUi('empty', { type: 'submit', valid: false });
    expect(next).toBe('error');
  });

  it('moves a valid submit into submitting and ignores a second submit', () => {
    const submitting = reduceConsultUi('empty', { type: 'submit', valid: true });
    expect(submitting).toBe('submitting');
    expect(reduceConsultUi(submitting, { type: 'submit', valid: true })).toBe('submitting');
    expect(reduceConsultUi('success', { type: 'submit', valid: true })).toBe('success');
  });

  it('resolves submitting into success or fail', () => {
    expect(reduceConsultUi('submitting', { type: 'resolved', ok: true })).toBe('success');
    expect(reduceConsultUi('submitting', { type: 'resolved', ok: false })).toBe('fail');
  });

  it('ignores a resolve that arrives outside submitting', () => {
    const states: ConsultUiState[] = ['empty', 'error', 'success', 'fail'];
    for (const state of states) {
      expect(reduceConsultUi(state, { type: 'resolved', ok: true })).toBe(state);
    }
  });

  it('lets a failed submit be retried back to empty and submitted again', () => {
    expect(reduceConsultUi('fail', { type: 'retry' })).toBe('empty');
    expect(reduceConsultUi('error', { type: 'retry' })).toBe('error');
    expect(reduceConsultUi('fail', { type: 'submit', valid: true })).toBe('submitting');
  });
});
