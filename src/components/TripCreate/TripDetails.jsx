import React from 'react'

const TripDetails = ({
    setName,
    // setPhone,
    setDescription,
}) => {

    const handleName = (e) => {
        setName(e.target.value)
    }

  return (
    <div
        className=" bg-primary flex flex-col h-[300px] w-[200px] md:w-[500px] gap-2 text-text "
    >
        <div>
            <input type="text"
                placeholder="Trip Title"
                onChange={handleName}
                className=" border border-border rounded-[30px] text-sm px-4 py-4 font-semibold w-full "
            />
        </div>
        <div
            className="flex flex-col flex-1 "
        >
            <textarea
                placeholder="Description (optional)"
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
                className=" border border-border rounded-[30px] text-sm flex-1 px-4 py-4 w-full "
            />

        </div>
    </div>
  )
}

export default TripDetails