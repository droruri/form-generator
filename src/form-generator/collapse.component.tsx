import React, {useEffect, useState} from 'react'

interface collapseProps {
  isOpen: boolean
  sectionTitle: any
  className: string
  children: any
  onChange?: any
}

export const Collapse = ({isOpen = false, sectionTitle = 'Header', className, children, onChange = null}: collapseProps) => {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  function onClick() {
    if (onChange) {
      onChange(sectionTitle)
    } else {
      setOpen(!open)
    }
  }

  return (
    <div className={className}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        cursor:"pointer"
      }} onClick={onClick}>

        {/* Title (can be a component */}
        <span>{sectionTitle}</span>

        {/* Horizontal border */}
        <div className="inline-horizontal-divider" style={{
          marginLeft: 10
        }}/>
      </div>

      {/* Actual content */}
      <div style={{display: open ? 'block' : 'none', marginLeft: 20}}>{children}</div>
    </div>
  )
}
