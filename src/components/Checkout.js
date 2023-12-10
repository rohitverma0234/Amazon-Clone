import React, { useEffect, useState } from 'react'
import './Checkout.css'
import commerce from '../lib/commerce'
import { useNavigate } from 'react-router-dom'


const Checkout = ({ cart }) => {
const navigate= useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")

    const [token, setToken] = useState({})
    const [countriesList, setCountriesList] = useState([])
    const [country, setCountry] = useState('')
    const [subdivisionList, setSubdivisionList] = useState([])
    const [subdivision, setSubdivision] = useState(null)
    const [shipping, setShipping] = useState(null)
    const [shippingOptions, setShippingOptions] = useState(null)

    console.log(8989,countriesList)
    const getShippingCountry = async (tokenID) => {
        try {
            const { countries } = await commerce.services.localeListShippingCountries(tokenID);
            setCountriesList(Object.entries(countries))
        } catch (error) {
            console.log(error)
        }
    }

    const getShippingSubdivisions = async (country) => {
        try {
            const { subdivisions } = await commerce.services.localeListSubdivisions(country);
            setSubdivisionList(Object.entries(subdivisions))
            setSubdivision(Object.keys(subdivisions)[0])
        } catch (error) {
            console.log(error)
        }
    }

    const generateToken = async (cartID) => {
        try {
            const token = await commerce.checkout.generateToken(cartID, { type: 'cart' })
            setToken(token)
        } catch (error) {
            console.log(error)
        }
    }

    const getShippingOptions = async (tokenID, c, s) => {
        try {
            const response = await commerce.checkout.getShippingOptions(tokenID.id, {
                country: c,
                region: s,
            })
            setShipping(response[0].id)
            setShippingOptions(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        generateToken(cart?.id)
        if (token) {
            getShippingCountry(token.cart_id)

        }
    }, [cart])



    useEffect(() => {
        if (country) {
            getShippingSubdivisions(country)
        }
    }, [country])

    useEffect(() => {
        if (subdivision) {
            getShippingOptions(token, country, subdivision)
        }
    }, [subdivision])

    const handleOptionChange = (e) => {
        setCountry(e.target.value)
    }
    const handleOptionSubdivision = (e) => {
        setSubdivision(e.target.value)
    }



    const handleChange = async (e) => {
        e.preventDefault()
        navigate('/thankyou')

        // if (generateToken) {
        //     const incomingOrder = await commerce.checkout.capture(generateToken, {
        //         line_items: generateToken.live.line_items,
        //         customer: {
        //             firstname: firstName,
        //             lastname: lastName,
        //             email: email
        //         },
        //         shipping: {
        //             name: firstName,
        //             street: address,
        //             town_city: city,
        //             county_state: subdivision,
        //             postal_zip_code: zip,
        //             country: country
        //         },
        //         fulfillment: {
        //             shipping_method: shipping,
        //         },

        //         payment: {
        //             gateway: 'test_gateway',
        //             card: {
        //                 number: '4242424242424242',
        //                 expiry_month: '02',
        //                 expiry_year: '24',
        //                 cvc: '123',
        //                 postal_zip_code: '94107',
        //             },
        //         },
        //         pay_what_you_want: cart.subtotal.raw
        //     })
        //     // setOrder(incomingOrder)
        //     console.log("first", incomingOrder)
        // }

    }

    return (
        <div className='checkout_wrap'>
            <h2>Shopping Details</h2>
            <br />

            <form action="" onSubmit={(e) => handleChange(e)}>
                <div className="checkout__form">
                    <div className="checkout__column">
                        <label htmlFor="">First Name*</label>
                        <input name="firstname" id="" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label htmlFor="">Last Name*</label>
                        <input name="lastname" id="" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label htmlFor="">Address*</label>
                        <input name="address" id="" required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label htmlFor="">Email*</label>
                        <input name="email" id="" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label htmlFor="">City*</label>
                        <input name="city" id="" required value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label htmlFor="">Zipcode*</label>
                        <input name="zipcode" id="" required value={zip} onChange={(e) => setZip(e.target.value)} />
                    </div>

                    {/* <div className="checkout__column">
                        <label htmlFor="">Shipping Country*</label>
                        <select name="country" id="" value={country} onChange={handleOptionChange}>
                            {
                                countriesList?.map((curVal, i) => {
                                    return <option value={curVal[0]} key={i}>{curVal[1]}</option>

                                })
                            }
                        </select>
                    </div>

                    <div className="checkout__column">
                        <label htmlFor="">Shipping Subdivision</label>
                        <select name="subdivision" id="" onChange={handleOptionSubdivision}>
                            {
                                subdivisionList?.map((curVal, i) => {
                                    return <option key={i} value={curVal[0]}>{curVal[1]}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="checkout__column">
                        <label htmlFor="">Shipping Options</label>
                        <select name="subdivision" id="">
                            {
                                shippingOptions?.map((curVal) => {
                                    console.log(899, curVal)
                                    return <option value={curVal.id}>{curVal.description} {curVal.price.formatted_with_symbol}</option>
                                })
                            }
                        </select>
                    </div> */}

                    <div className="checkout__column">
                        <label htmlFor="">&nbsp;</label>
                        <button>Pay Now</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Checkout