import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [record, setRecord] = useState([]);
  const [editid, setEditid] = useState("");

  const handleSubmit = () => {
    if (editid) {
      axios.put(`https://realtime-project-12-default-rtdb.firebaseio.com/users/${editid}.json`, {
        name: name,
        phone: phone,
        company: company,
        email: email,
        message: message
      })
        .then((res) => {
          alert("Record successfully edited.");
          setEditid("");
          getRecord();
          setName("");
          setPhone("");
          setCompany("");
          setEmail("");
          setMessage("");
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    else {
      axios.post(`https://realtime-project-12-default-rtdb.firebaseio.com/users.json`, {
        name: name,
        phone: phone,
        company: company,
        email: email,
        message: message
      }).then((res) => {
        alert("Record successfully added..")
        setName("");
        setPhone("");
        setCompany("");
        setEmail("");
        setMessage("");
        getRecord();
      }).catch((err) => {
        console.log(err);
        return false;
      })
    }

  }

  const deletedata = (id) => {
    axios.delete(`https://realtime-project-12-default-rtdb.firebaseio.com/users/${id}.json`)
      .then((res) => {
        alert("Record successfully deleted.");
        getRecord();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getRecord = () => {
    axios.get(`https://realtime-project-12-default-rtdb.firebaseio.com/users.json`)
      .then((res) => {
        let data = res.data;
        let record = [];
        for (let i in data) {
          record.unshift({
            ...data[i], id: i
          })
        }
        setRecord(record);
      }).catch((err) => {
        console.log(err);
        return false;
      })
  }
  const editdata = async (id) => {
    try {
      let edit = await axios.get(`https://realtime-project-12-default-rtdb.firebaseio.com//users/${id}.json`);
      if (edit.data) {
        setName(edit.data.name)
        setPhone(edit.data.phone)
        setCompany(edit.data.company);
        setEmail(edit.data.email);
        setMessage(edit.data.message);
        setEditid(id)
      }
      else {
        console.log("Record not found..");
        return false;
      }
    }
    catch (err) {
      console.log(err);
      return false;

    }

  }
  useEffect(() => {
    getRecord();
  }, [])

  return (

    <>

      <body>
        <h1 style={{ textAlign: 'center', fontSize: "50px", margin: '10px 0px' }}>Form</h1>
        <section id="section-wrapper">
          <div class="box-wrapper">
            <div class="info-wrap">
              <h2 class="info-title">Contact Information</h2>
              <h3 class="info-sub-title">Fill up the form and our Team will get back to you within 24 hours</h3>
              <ul class="info-details">
                <li>
                  <i class="fas fa-phone-alt"></i>
                  <span>Phone:</span> <a href="tel:+ 1235 2355 98">+ 1235 2355 98</a>
                </li>
                <li>
                  <i class="fas fa-paper-plane"></i>
                  <span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                </li>
                <li>
                  <i class="fas fa-globe"></i>
                  <span>Website:</span> <a href="#">yoursite.com</a>
                </li>
              </ul>
              <ul class="social-icons">
                <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
              </ul>
            </div>
            <div class="form-wrap">
              <form action="#" method="POST">
                <h2 class="form-title">Send us a message</h2>
                <div class="form-fields">
                  <div class="form-group">
                    <input type="text" class="fname" name='name' onChange={(e) => setName(e.target.value)} value={name} placeholder="First Name" />
                  </div>
                  <div class="form-group">
                    <input type="text" name='company' onChange={(e) => setCompany(e.target.value)} value={company} class="lname" placeholder="Company Name" />
                  </div>
                  <div class="form-group">
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} class="email" placeholder="Mail" />
                  </div>
                  <div class="form-group">
                    <input type="number" name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} class="phone" placeholder="Phone" />
                  </div>
                  <div class="form-group">
                    <textarea name='message' onChange={(e) => setMessage(e.target.value)} value={message} id="" placeholder="Write your message"></textarea>
                  </div>
                </div>
                <input type="button" onClick={() => handleSubmit()} value="submit" class="submit-button" />
              </form>
            </div>
          </div>
        </section>
      </body>


    </>
  );
}

export default App;
