'use server';

import { revalidatePath } from 'next/cache';

export const deleteTemplete = async (name_template: string) => {
  'use server';
  let response;

  try {
    await fetch(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/100609346426084/' +
        name_template,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((result) => {
        // ;
        response = result.json();
        return result.json();
      })
      .catch((error) => {
        // ;
      });
  } catch (error) {
    // ;
  }

  revalidatePath('/dashboard/bulk-messages');
  return response;
};
