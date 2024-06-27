(window as any).fbAsyncInit = function () {
  FB.init({
    appId: '2448667798617426',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v18.0',
  });
};

const sessionInfoListener = (event: any) => {
  if (event.origin !== 'https://www.facebook.com') return;
  try {
    const data = JSON.parse(event.data);
    if (data.type === 'WA_EMBEDDED_SIGNUP') {
      // if user finishes the Embedded Signup flow
      if (data.event === 'FINISH') {
        const { phone_number_id, waba_id } = data.data;
      }
      // if user cancels the Embedded Signup flow
      else {
        const { current_step } = data.data;
      }
    }
  } catch {
    // Don’t parse info that’s not a JSON
    // ;
  }
};

window.addEventListener('message', sessionInfoListener);
////////////////////////

// Load the JavaScript SDK asynchronously
(function (d: any, s: any, id: any) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

// Facebook Login with JavaScript SDK
function launchWhatsAppSignup() {
  // Conversion tracking code
  //fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', {appId: '2448667798617426', feature: 'whatsapp_embedded_signup'});

  // Launch Facebook login
  FB.login(
    function (response: any) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        //Use this token to call the debug_token API and get the shared WABA's ID
      } else {
        // ;
      }
    },
    {
      config_id: '450950900606555', // configuration ID obtained in the previous step goes here
      response_type: 'code', // must be set to 'code' for System User access token
      override_default_response_type: true,
      scope: 'whatsapp_business_management, whatsapp_business_messaging',

      //   extras: {
      //     feature: 'whatsapp_embedded_signup',
      //     version: 2,
      //     sessionInfoVersion: 2,
      //     setup: {
      //       business: {
      //         name: 'Acme Inc.',
      //         email: 'johndoe@acme.com',
      //         phone: {
      //           code: 1,
      //           number: '6505551234',
      //         },
      //         website: 'https://www.acme.com',
      //         address: {
      //           streetAddress1: '1 Acme Way',
      //           city: 'Acme Town',
      //           state: 'CA',
      //           zipPostal: '94000',
      //           country: 'US',
      //         },
      //         timezone: 'UTC-08:00',
      //       },
      //       phone: {
      //         displayName: 'Acme Inc',
      //         category: 'ENTERTAIN',
      //         description: 'Acme Inc. is a leading entertainment company.',
      //       },
      //     },
      //   },
    }
  );
}
