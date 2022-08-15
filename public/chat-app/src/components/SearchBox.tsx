import React, { useEffect, useState } from 'react'

export default function SearchBox(contacts: any) {
    const [searchText, setSearchText] = useState('')
    const [searchRes,setSearchRes] = useState([])
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        // @ts-expect-error TS(2588): Cannot assign to 'setSearchRes' because it is a co... Remove this comment to see the full error message
        setSearchRes=contacts.filter((res: any) => {res.username.indexOf(searchText)!==-1})
    },[searchText])

    const changeSearch = (e: any) => {
        
    }


    return (
        <>
            <input type='text' placeholder="查找联系人" onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
        </>
    )
}
