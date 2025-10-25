// src/components/estimator/utils/emailSubmit.ts
import { EstimatorState } from '../../EstimatorForm';

export async function submitEstimate(state: EstimatorState, recipient: string) {
  const payload = {
    to: recipient,
    subject: `New Project Estimate Request — ${state.project}`,
    text: `New estimate submitted:\n
Name: ${state.contact.firstName} ${state.contact.lastName}
Email: ${state.contact.email}
Phone: ${state.contact.phone || '—'}
Project Type: ${state.project}
Address: ${state.address || 'Not provided'}

Notes:\n${state.contact.notes || 'None'}

Details:\n${JSON.stringify(state.details, null, 2)}`
  };

  // Replace this with actual email logic (e.g., SendGrid, Nodemailer, API route)
  console.log('Sending email to', recipient);
  console.log(payload);

  return new Promise((resolve) => setTimeout(resolve, 1000));
}