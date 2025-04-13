import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        income: '0',
        expense: '0',
        username: '',
        description: '',
        category: '',
        date: ''
    })
    const [data, setData] = useState([])
    const [incomeActive, setIncomeActive] = useState(true)
    const [ExpenseActive, setExpenseActive] = useState(true)
    const HandleChange = (e) => {
      console.log(e.target.value)
      const { name, value } = e.target;
      if(name === 'income' && value!==''){
        setIncomeActive(true)
        setExpenseActive(false)
      }
      else if(name === 'expense' && value !== ''){
        setIncomeActive(false)
        setExpenseActive(true)
      }
      else{
        setIncomeActive(true)
        setExpenseActive(true)
      }
      
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    useEffect(() => {
      const storedData = localStorage.getItem('data')
      if (storedData) {
        setData(JSON.parse(storedData))
        }
    }, [])
    useEffect(() => {
      localStorage.setItem('data', JSON.stringify(data))
      }, [data])
    console.log(formData, "Data")
    const HandleSubmit = (e) => {
      
      e.preventDefault()
      console.log(formData);
      const today = new Date();
      const selectedDate = new Date(formData.date);

      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        alert("❌ This date is not valid. You can’t enter a future date.");
        return;
      }

        if(formData.income && formData.expense && formData.username && formData.description && formData.category && formData.date){
          
          setData((prev) => [...prev, formData])
          setFormData({
            income: '0',
            expense: '0',
            username: '',
            description: '',
            category: '',
            date: ''
            })
            
      }

  }
  return (
    <>
    <div className='container form-contaier'>
    <form className="row g-3 needs-validation" novalidate>
  <div className="col-md-4">
    <label htmlFor="validationCustom01" className="form-label">Income</label>
    <input disabled={!incomeActive} onChange={HandleChange} name='income' type="number" className="form-control" id="validationCustom01"  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Expense</label>
    <input  disabled={!ExpenseActive} onChange={HandleChange} name='expense' type="number" className="form-control" id="validationCustom02"  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustomUsername" className="form-label">Username</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">@</span>
      <input onChange={HandleChange} name='username' type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
      <div className="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Description</label>
    <input onChange={HandleChange} name='description' type="text" className="form-control" id="validationCustom03" required autoComplete='off'/>
   
  </div>
  <div className="col-md-3">
  <label htmlFor="validationCustom04" className="form-label">Category</label>
    <select onChange={HandleChange} name='category' className="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose...</option>
      <option>Food</option>
      <option>Travel</option>
      <option>Utility Bills</option>
      <option>Pharma Services</option>
      <option>Salary</option>
      <option>Sell Product</option>
      <option>Groceries</option>
      <option>Charity</option>
      <option>In-App Subscriptions</option>
      <option>Tuition Fee</option>
    </select>
    <div className="invalid-feedback">
      Please select a valid state.
    </div>
  </div>

  <label htmlFor="validationCustom05" className="form-label">Date</label>
  <input max={new Date().toISOString().split("T")[0]} onChange={HandleChange} type="date" name="date" className='col-md-3 date' />
  
  <div className="col-12">
    <button onClick={HandleSubmit} name='save' className="btn btn-primary" type="button">Save</button>
  </div>
  <Link to="/records">
  <div className="col-12">
    <div className="btn btn-warning">Records</div>
  </div>
  </Link>
  
</form>

    </div>
    </>
  )
}
export default TransactionForm
