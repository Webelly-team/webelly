import React from 'react'
import { CircularTestimonials } from '@/components/ui/circular-testimonials';


const Testimonals = () => {
    const testimonials = [
        {
            quote:
                "I was impressed by the Website! This made my daily reach and engagement grow by 30%. I'll definitely be back for more!",
            name: "Healthy Jeewan",
            designation: "Youtuber",
            src:
                "/projects/healthy-jeewan.png",
            url:"https://healthyjeevan.co.in"
        },
        {
            quote:
                "Was searching for many softwares for my inventory management, but Webelly team helped me with a custom solution that is easy to use and has all the features I need. Highly recommend!",
            name: "Balaji Bachat Bazaar",
            designation: "Shop Owner",
            src:
                "/projects/apni-dukan.png",
            url:"https://apni-dukan-alpha.vercel.app"
        },
        {
            quote:
                "Webelly's team is very professional and they delivered my project on time. The quality of work is excellent and I am very satisfied with the results.",
            name: "Nebula Tech",
            designation: "Organisation",
            src:
                "/projects/nebula.png",
            url:"https://nebula-hmld.vercel.app/"
        },
    ];

    return (
        <>
            <div className="bg-[#060507] p-6 md:p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
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
