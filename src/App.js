import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid' // unique ID yaratish uchun
import './App.css'

const CoffeeShop = () => {
  const [orders, setOrders] = useState([]) // buyurtmalar ro'yxati
  const [form, setForm] = useState({
    customerName: '',
    coffeeType: '',
    size: '',
    status: 'pending'
  })

  // Buyurtma qo'shish funksiyasi
  const addOrder = () => {
    const newOrder = {
      id: uuidv4(), // unique ID
      ...form
    }
    setOrders([...orders, newOrder])
    resetForm()
  }

  // Buyurtmani tahrirlash funksiyasi
  const updateOrder = (id, updatedData) => {
    setOrders(
      orders.map(order =>
        order.id === id ? { ...order, ...updatedData } : order
      )
    )
  }

  // Buyurtmani o'chirish funksiyasi
  const deleteOrder = id => {
    setOrders(orders.filter(order => order.id !== id))
  }

  // Formani reset qilish funksiyasi
  const resetForm = () => {
    setForm({
      customerName: '',
      coffeeType: '',
      size: '',
      status: 'pending'
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Coffee Shop</h1>
      {/* Form */}
      <div>
        <input
          type='text'
          placeholder='Customer Name'
          value={form.customerName}
          onChange={e => setForm({ ...form, customerName: e.target.value })}
        />
        <input
          type='text'
          placeholder='Coffee Type'
          value={form.coffeeType}
          onChange={e => setForm({ ...form, coffeeType: e.target.value })}
        />
        <select
          value={form.size}
          onChange={e => setForm({ ...form, size: e.target.value })}
        >
          <option value=''>Select Size</option>
          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
          <option value='large'>Large</option>
        </select>
        <button onClick={addOrder}>Add Order</button>
      </div>

      {/* Orders List */}
      <h2>Orders</h2>
      {orders.map(order => (
        <div
          key={order.id}
          style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px 0'
          }}
        >
          <p>
            <strong>ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer Name:</strong> {order.customerName}
          </p>
          <p>
            <strong>Coffee Type:</strong> {order.coffeeType}
          </p>
          <p>
            <strong>Size:</strong> {order.size}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <button
            onClick={() => updateOrder(order.id, { status: 'completed' })}
          >
            Mark as Completed
          </button>
          <button onClick={() => deleteOrder(order.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default CoffeeShop
