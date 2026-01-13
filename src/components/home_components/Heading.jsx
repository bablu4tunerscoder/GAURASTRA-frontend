import React from 'react'

const Heading = ({ title }) => {
    return (
        <h2 className="relative text-lg font-serif sm:text-3xl md:text-4xl md:my-6 my-4 font-semibold tracking-tight text-heading capitalize">
            {title}
            <img src="/assets/headingArrow.svg" alt={title} className="absolute md:-top-3 top-0 md:-left-2.5 -left-1.5 md:w-12 w-6" />
        </h2>
    )
}

export default Heading
