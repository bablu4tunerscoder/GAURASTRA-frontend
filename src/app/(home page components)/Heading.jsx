import React from 'react'

const Heading = ({ title }) => {
    return (
        <h2 className="relative text-2xl font-serif sm:text-3xl md:text-4xl my-6 font-semibold tracking-tight text-primary capitalize">
            {title}
            <img src="/assets/headingArrow.svg" alt={title} className="absolute -top-3 -left-2.5 w-12" />
        </h2>
    )
}

export default Heading
