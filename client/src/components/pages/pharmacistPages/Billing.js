import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// import ReactPDF from '@react-pdf/renderer';

// ReactPDF.renderToStream(<Invoice />);

// function Invoice({ billingItems, totalAmount }) {
//   const styles = StyleSheet.create({
//     page: {
//       fontFamily: 'Helvetica',
//       fontSize: 12,
//       padding: 20,
//     },
//     title: {
//       fontSize: 24,
//       marginBottom: 20,
//     },
//     section: {
//       marginBottom: 10,
//     },
//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 5,
//     },
//     itemName: {
//       flexGrow: 1,
//     },
//     itemPrice: {
//       width: 60,
//       textAlign: 'right',
//     },
//     totalAmount: {
//       fontSize: 14,
//       marginTop: 20,
//       textAlign: 'right',
//     },
//   });

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View>
//           <Text style={styles.title}>Invoice</Text>
//           <Text>Date: {new Date().toLocaleDateString()}</Text>
//           <Text>Time: {new Date().toLocaleTimeString()}</Text>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Bought Items:</Text>
//           {billingItems.map((item, index) => (
//             <View key={index} style={styles.row}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemPrice}>${item.price}</Text>
//             </View>
//           ))}
//         </View>

//         <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
//       </Page>
//     </Document>
//   );
// }

function MedicineBilling() {
  const [serverData, setServerData] = useState('')
  const [medicineData, setMedicineData] = useState('')
  const [medicineCount, setMedicineCount] = useState('')

  async function getData() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token not found');
      return
    }

    try {
      const [profileResponse, medicineDataResponse, medicineCountResponse] = await Promise.all([
        fetch('http://localhost:5000/api/pharmacist_profile', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/medicine', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/count_medicine', {
          headers: {
            'x-access-token': token,
          },
        }),
      ])

      const [profileData, medicineData, medicineCount] = await Promise.all([
        profileResponse.json(),
        medicineDataResponse.json(),
        medicineCountResponse.json(),
      ])

      if (profileData.status === 'ok') {
        setServerData(profileData)
      } else {
        alert('Error in dashboardDetails: ' + profileData.error)
      }

      if (medicineData.status === 'ok') {
        setMedicineData(medicineData.medicines.medicine)
      } else {
        alert('Error: ' + medicineData.error)
      }

      if (medicineCount.status === 'ok') {
        setMedicineCount(medicineCount.count)
      } else {
        alert('Error in dashboardDetails: ' + medicineCount.error)
      }
    } catch (error) {
      console.log('All Data Error:', error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getData()
    } else {
      alert('error in dashboard useEffect')
    }
  }, [])

  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [billingItems, setBillingItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMedicineChange = (event) => {
    setSelectedMedicine(event.target.value)
  }

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value))
  }

  const handleAddToBilling = () => {
    const selectedMedicineData = medicineData.find((medicine) => medicine.name === selectedMedicine);

    if (selectedMedicineData) {
      const medicine = {
        name: selectedMedicine,
        price: selectedMedicineData.price,
        quantity: quantity,
      }

      setBillingItems([...billingItems, medicine])
      setSelectedMedicine('')
      setQuantity(1)
    }
  }

  const handleRemoveFromBilling = (index) => {
    const updatedBillingItems = [...billingItems]
    updatedBillingItems.splice(index, 1)
    setBillingItems(updatedBillingItems)
  }

  const getTotalAmount = () => {
    let total = 0

    billingItems.forEach((item) => {
      total += item.price * item.quantity
    })

    return total
  }

  const generateInvoice = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <nav className="nav flex-column menu position-fixed">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center rounded-circle mt-4 mb-2">
              <img src={serverData.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2" />
            </div>
            <div className="col-12">
              <h6 className="text-white text-center mb-4">{serverData.firstName && serverData.lastName
                ? `${serverData.firstName} ${serverData.lastName}`
                : serverData.firstName || serverData.lastName || 'No Username Found'}</h6>
            </div>
            <div className="col-12 links mb-5">
              <Link className="nav-link text-white" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/inventory"><i className="fa-solid fa-warehouse me-1"></i>Inventory</Link>
              <Link className="nav-link text-primary current-link" to="/medicineBill"><i class="fa-solid fa-file-invoice me-1"></i>Medicine Bill</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link className="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/medicineBill">Bill</Link>
        </div>
      </nav>
      <div className="container amount-card">
        <div className="row mb-3 d-flex">
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="u1 fa-solid fa-user-group icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Patients</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-pills icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Medicines</h6>
                <p className="card-text fs-5">{medicineCount || '0'}</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-rupee-sign icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Income</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container finder1">
        <div className="row bg-white shadow my-3">
          <div className="col-12">
            <h1 className="text-center text-primary my-4">Inventory Management System</h1>
            <div className="d-flex">
              <div className="form-floating mb-3 w-25 me-3">
                <select className="form-select" id="medicine" value={selectedMedicine} onChange={handleMedicineChange}>
                  <option value="">Select a medicine</option>
                  {medicineData && medicineData.length > 0 ? (
                    medicineData.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))
                  ) : <span></span>}
                </select>
                <label htmlFor="medicine" className="text-secondary me-2">Medicine:</label>
              </div>
              <div className="form-floating">
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="form-control"
                />
                <label htmlFor="quantity" className="text-secondary">Quantity:</label>
              </div>
              <button onClick={handleAddToBilling} className="customButton rounded-pill ms-2 bill-btn">Add to Billing</button>
            </div>
            <div className="col-12 d-flex mt-3 mb-2">
              <div className="col-2">
                <h6>Medicine</h6>
              </div>
              <div className="col-2">
                <h6>Quantity</h6>
              </div>
              <div className="col-2">
                <h6>Price</h6>
              </div>
              <div className="col-2">
                <h6>Amount</h6>
              </div>
              <div className="col-4">
                <h6>Action</h6>
              </div>
            </div>
            <hr className="mt-0" />
            {billingItems.map((item, index) => (
              <div className="col-12 d-flex mt-3 mb-2" key={index}>
                <div className="col-2">
                  <h6>{item.name}</h6>
                </div>
                <div className="col-2">
                  <h6>{item.quantity}</h6>
                </div>
                <div className="col-2">
                  <h6>{item.price}</h6>
                </div>
                <div className="col-2">
                  <h6>{item.price * item.quantity}</h6>
                </div>
                <div className="col-4">
                  <button onClick={() => handleRemoveFromBilling(index)} className="customButton rounded-pill">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center mt-2 mb-5">
            <h6 className="text-secondary me-5">Total Amount: {getTotalAmount()}</h6>
            <Button onClick={generateInvoice} className="customButton rounded-pill">Generate Invoice</Button>

            <Modal show={isModalOpen} onHide={closeModal} contentLabel="Invoice">
              <Modal.Header closeButton>
                <Modal.Title className="text-primary">Invoice</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <center><img src={process.env.PUBLIC_URL + '/logos/logo.png'} alt="Logo" className="img-fluid w-25 h-25 my-2" /></center>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
                <h6>Bought Items:</h6>
                <ol>
                  <li className="bill-list d-flex">
                    <div className="col-4">
                      Name
                    </div>
                    <div className="col-4">
                      Price
                    </div>
                    <div className="col-4">
                      Quantity
                    </div>
                  </li>
                  <hr />
                  {billingItems.map((item, index) => (
                    <li key={index} className="bill-list d-flex">
                      <div className="col-4">
                        {item.name}
                      </div>
                      <div className="col-4">
                        Rs. {item.price}
                      </div>
                      <div className="col-4">
                        {item.quantity}
                      </div>
                    </li>
                  ))}
                </ol>
                <h6>Total Amount: <span className="ms-3">Rs. {getTotalAmount()}</span></h6>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                {/* <PDFViewer width="800" height="600">
                  <Invoice billingItems={billingItems} totalAmount={getTotalAmount()} />
                </PDFViewer> */}
                <Button className="customButton rounded-pill">Download Invoice</Button>
                <Button onClick={closeModal} className="customButton rounded-pill">Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicineBilling