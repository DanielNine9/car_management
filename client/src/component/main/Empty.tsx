import React from 'react'

type Props = {}

const Empty = (props: Props) => {
    return (
        <div>
            <div className="bg-white p-4 rounded shadow-md">
                <p className="text-xl font-semibold mb-2">Shop is empty.</p>
                <p className="text-gray-500">Add some products to your cart before checking out.</p>
            </div>

        </div>
    )
}

export default Empty