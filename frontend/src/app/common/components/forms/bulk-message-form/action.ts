'use server';

import { error } from 'console';
import { revalidatePath } from 'next/cache';

export const postBulkMessageTemplate = async (bulkMessageTemplate: any) => {
  'use server';
  let response;

  try {
    await fetch(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/100609346426084',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkMessageTemplate),
      }
    ).then((result) => {
      // ;
      response = result.json();
      return result.json();
    });
  } catch (error) {
    // ;
  }

  revalidatePath('/dashboard/bulk-messages');
  return response;
};

export const EditBulkMessageTemplate = async (
  bulkMessageTemplateEdit: any,
  id: string
) => {
  'use server';
  let response: any;
  // ;
  //console.log(
  //   'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/100609346426084/' +
  //     id,
  //   'url of the site'
  // );

  try {
    await fetch(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/100609346426084/' +
        id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkMessageTemplateEdit),
      }
    )
      .then((result) => {
        // ;
        response = result.status;
        // return result;
      })
      .catch((error) => {
        // // ;
        response = error;
      });
  } catch (error) {
    // ;
    response = error;
  }

  revalidatePath('/dashboard/bulk-messages');
  return response;
};
