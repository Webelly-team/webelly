import React from 'react'
import { CircularTestimonials } from '@/components/ui/circular-testimonials';


const Testimonals = () => {
    const testimonials = [
        {
            quote:
                "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
            name: "Name 1",
            designation: "Designation jo hai",
            src:
                "/person.png",
        },
        {
            quote:
                "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
            name: "Name 2",
            designation: "Designation inki",
            src:
                "/image.png",
        },
        {
            quote:
                "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
            name: "Name 3",
            designation: "Designatino 3",
            src:
                "/image2.png",
        },
    ];

    return (
        <>
            <div className="bg-[#060507] p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
                <div
                    className="items-center justify-center relative flex"
                    style={{ maxWidth: "1024px" }}
                >
                    <CircularTestimonials
                        testimonials={testimonials}
                        autoplay={true}
                        colors={{
                            name: "#f7f7ff",
                            designation: "#e1e1e1",
                            testimony: "#f1f1f7",
                            arrowBackground: "#0582CA",
                            arrowForeground: "#141414",
                            arrowHoverBackground: "#f7f7ff",
                        }}
                        fontSizes={{
                            name: "28px",
                            designation: "20px",
                            quote: "20px",
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Testimonals
