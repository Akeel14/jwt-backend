import sgMail from '@sendgrid/mail';
import HttpError from '../models/http-error.js';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export const sendNotification = (req,res, next)=>{
    const {userName, invitedUserEmail, familyCode}=req.body;

    const msg = {
        to: invitedUserEmail,
        from: {
          name: 'HomeSync',
          email:'WhatNowmap@gmail.com'
        },
        subject: 'You has been invited to HomeSync',
        text: 'HomeSync',
        html: `<div style="background-color:#ffffff; text-align: center; font-size:2rem;">
                  <img src="https://firebasestorage.googleapis.com/v0/b/homesync-e3157.appspot.com/o/HomeSync-logo.png?alt=media&token=bbc69a67-217c-47ca-bc7e-70c6e7b9f9b6" alt="logo"  
                         style="width:170px; aspect-ratio: 2.7 / 1; margin-top:30px;" /><br>
                  <span style="color:#0075C2;">${userName}</span> has invited<br>
                  you to join ${userName}\'s <br>
                  group in <span style="color:#234E70;">Home Sync</span>
                  <p style="text-decoration:underline; font-size:1rem; margin: 40px 0px;">
                     Click the button below to join
                  </p>
                  <button style="background-color:#234E70; width:50%; padding: 5px 0px; font-weight:bold; border:none; border-radius:20px">
                   <a href='http://127.0.0.1:5173/register?familycode=${familyCode}' style="color:white; font-size:2.8vw; text-decoration:none">Join the group</a>
                  </button>
              </div>`
      };

      sgMail.send(msg).then((response)=>{
        res.status(200).json('notification had been sent')
      }).catch(err=>{
        return next(new HttpError(err,403))
      })
}
