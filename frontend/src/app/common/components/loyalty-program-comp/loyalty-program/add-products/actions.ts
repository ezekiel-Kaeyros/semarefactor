'use server';

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const postData = async (newItem: any) => {
  ('use server');
  let response;

  // let response = NextResponse.next();

  try {
    await fetch(
      'https://6r10kf27nk.execute-api.eu-central-1.amazonaws.com/prod/program/100609346426084',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      }
    )
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        response = result.data;
        return result.data;
      });
  } catch (error) {
    // ;
  }

  // ;
  revalidatePath('/dashboard/loyalty-program');

  return response;
};
