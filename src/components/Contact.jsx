// src/components/Contact.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { LINKS, PROFILE } from "../utils/data";

const Contact = () => {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    const SERVICE_ID = "YOUR_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const USER_ID = "YOUR_USER_ID";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: form.name,
      reply_to: form.email,
      message: form.message
    }, USER_ID).then((res)=> {
      setStatus("sent");
      setForm({name:"", email:"", message:""});
    }).catch((err)=>{
      setStatus("error");
    });
  };

  return (
    <section id="contact" className="container">
      <h2 className="h2">Contact</h2>
      <div style={{display:"flex", gap:24, marginTop:12, alignItems:"flex-start", flexWrap:"wrap"}}>
        <form className="contact-form card" onSubmit={sendEmail}>
          <input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
          <textarea className="input" placeholder="Message" rows={6} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required/>
          <button type="submit" style={{padding:"10px 14px", borderRadius:8, background:"var(--accent)", color:"#fff", border:"none", cursor:"pointer"}}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "sent" && <div style={{color:"green", marginTop:8}}>Thanks — message sent!</div>}
          {status === "error" && <div style={{color:"crimson", marginTop:8}}>Error sending. Try again later.</div>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
