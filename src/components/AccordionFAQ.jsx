import React, { useEffect, useState, useRef } from 'react'
import { ChevronDown, Volume2, Pause, Play, StopCircle } from 'lucide-react'


export default function AccordionFAQ() {
const [voices, setVoices] = useState([])
const [openIndex, setOpenIndex] = useState(null)
const [speakingIndex, setSpeakingIndex] = useState(null)
const [isPaused, setIsPaused] = useState(false)
const [selectedVoiceName, setSelectedVoiceName] = useState('')
const utterRef = useRef(null)


useEffect(() => {
const load = () => {
const v = window.speechSynthesis.getVoices()
setVoices(v)
if (!selectedVoiceName && v.length) {
setSelectedVoiceName(v[0].name)
}
}


load()
window.speechSynthesis.onvoiceschanged = load


return () => {
window.speechSynthesis.onvoiceschanged = null
}
}, [selectedVoiceName])


const faqData = [
{
q: 'What is your return policy?',
a: 'You can return any product within 7 days of delivery for a full refund. The product should be unused and in original packaging.'
},
{
q: 'Do you offer free shipping?',
a: 'Yes, we offer free shipping on all orders above ₹499. For orders below that amount, standard shipping charges apply.'
},
{
q: 'How can I track my order?',
a: 'You can track your order from the My Orders section. We will also send tracking details to your registered email and phone number.'
},
]


const toggleFAQ = (idx) => {
setOpenIndex(openIndex === idx ? null : idx)
}


}