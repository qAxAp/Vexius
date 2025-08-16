"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  Square,
  Copy,
  Download,
  Play,
  Smartphone,
  Monitor,
  Tablet,
  Code,
  Folder,
  X,
  Grid3X3,
  Move,
  MousePointer,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UIElement {
  id: string
  type: "Frame" | "TextLabel" | "TextButton" | "TextBox" | "ImageLabel" | "ScrollingFrame"
  name: string
  x: number
  y: number
  width: number
  height: number
  properties: {
    BackgroundColor3: { R: number; G: number; B: number }
    BackgroundTransparency: number
    BorderSizePixel: number
    Text?: string
    TextColor3?: { R: number; G: number; B: number }
    TextSize?: number
    Font?: string
    TextXAlignment?: string
    TextYAlignment?: string
    Visible: boolean
    ZIndex: number
  }
  children: string[]
}

const ROBLOX_FONTS = {
  SourceSans: { family: "system-ui, -apple-system, sans-serif", weight: "400" },
  SourceSansBold: { family: "system-ui, -apple-system, sans-serif", weight: "700" },
  Gotham: { family: "Inter, system-ui, sans-serif", weight: "500" },
  GothamBold: { family: "Inter, system-ui, sans-serif", weight: "700" },
  Roboto: { family: "Roboto, sans-serif", weight: "400" },
  RobotoBold: { family: "Roboto, sans-serif", weight: "700" },
}

export function UIBuilderInterface() {
  const [elements, setElements] = useState<UIElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)
  const [gridSize, setGridSize] = useState(10)
  const [snapToGrid, setSnapToGrid] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)

  const addElement = (type: UIElement["type"]) => {
    const newElement: UIElement = {
      id: `${type}_${Date.now()}`,
      type,
      name: `${type}${elements.length + 1}`,
      x: 50 + elements.length * 20,
      y: 50 + elements.length * 20,
      width: type === "Frame" ? 200 : type.includes("Text") ? 150 : 100,
      height: type === "Frame" ? 150 : type.includes("Text") ? 40 : 100,
      properties: {
        BackgroundColor3: type === "Frame" ? { R: 255, G: 255, B: 255 } : { R: 200, G: 200, B: 200 },
        BackgroundTransparency: type.includes("Text") ? 0 : 0,
        BorderSizePixel: 1,
        Text: type.includes("Text") ? `Sample ${type}` : undefined,
        TextColor3: type.includes("Text") ? { R: 0, G: 0, B: 0 } : undefined,
        TextSize: type.includes("Text") ? 18 : undefined,
        Font: type.includes("Text") ? "SourceSans" : undefined,
        TextXAlignment: type.includes("Text") ? "Center" : undefined,
        TextYAlignment: type.includes("Text") ? "Center" : undefined,
        Visible: true,
        ZIndex: elements.length + 1,
      },
      children: [],
    }

    setElements([...elements, newElement])
    setSelectedElement(newElement.id)
  }

  const updateProperty = (elementId: string, propertyPath: string, value: any) => {
    setElements((prevElements) =>
      prevElements.map((element) => {
        if (element.id !== elementId) return element

        const updatedElement = { ...element }

        if (propertyPath === "name") {
          updatedElement.name = value
        } else if (propertyPath.includes(".")) {
          // Handle nested properties like BackgroundColor3.R
          const [prop, subProp] = propertyPath.split(".")
          updatedElement.properties = {
            ...updatedElement.properties,
            [prop]: {
              ...updatedElement.properties[prop as keyof typeof updatedElement.properties],
              [subProp]: value,
            },
          }
        } else {
          updatedElement.properties = {
            ...updatedElement.properties,
            [propertyPath]: value,
          }
        }

        return updatedElement
      }),
    )
  }

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    e.stopPropagation()

    const element = elements.find((el) => el.id === elementId)
    if (!element) return

    setSelectedElement(elementId)
    setIsDragging(true)

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !selectedElement || !canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      let newX = e.clientX - canvasRect.left - dragOffset.x
      let newY = e.clientY - canvasRect.top - dragOffset.y

      if (snapToGrid) {
        newX = Math.round(newX / gridSize) * gridSize
        newY = Math.round(newY / gridSize) * gridSize
      }

      // Boundary constraints
      newX = Math.max(0, Math.min(newX, canvasRect.width - 100))
      newY = Math.max(0, Math.min(newY, canvasRect.height - 50))

      setElements((prevElements) =>
        prevElements.map((element) => (element.id === selectedElement ? { ...element, x: newX, y: newY } : element)),
      )
    },
    [isDragging, selectedElement, dragOffset, snapToGrid, gridSize],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const getElementStyle = (element: UIElement): React.CSSProperties => {
    const { properties } = element
    const bgColor = properties.BackgroundColor3
    const textColor = properties.TextColor3
    const font = properties.Font ? ROBLOX_FONTS[properties.Font as keyof typeof ROBLOX_FONTS] : ROBLOX_FONTS.SourceSans

    return {
      position: "absolute",
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      backgroundColor: `rgba(${bgColor.R}, ${bgColor.G}, ${bgColor.B}, ${1 - properties.BackgroundTransparency})`,
      color: textColor ? `rgb(${textColor.R}, ${textColor.G}, ${textColor.B})` : "rgb(0, 0, 0)",
      fontSize: properties.TextSize ? `${properties.TextSize}px` : "14px",
      fontFamily: font.family,
      fontWeight: font.weight,
      border: properties.BorderSizePixel > 0 ? `${properties.BorderSizePixel}px solid rgb(27, 42, 53)` : "none",
      borderRadius: element.type === "TextButton" ? "4px" : "0px",
      display: "flex",
      alignItems:
        properties.TextYAlignment === "Top"
          ? "flex-start"
          : properties.TextYAlignment === "Bottom"
            ? "flex-end"
            : "center",
      justifyContent:
        properties.TextXAlignment === "Left"
          ? "flex-start"
          : properties.TextXAlignment === "Right"
            ? "flex-end"
            : "center",
      cursor: "move",
      userSelect: "none",
      zIndex: properties.ZIndex,
      opacity: properties.Visible ? 1 : 0.5,
      boxSizing: "border-box",
      padding: element.type === "TextBox" ? "8px" : "4px",
    }
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const generateLuaCode = () => {
    let code = "-- Generated Roblox UI Code\n"
    code += 'local ScreenGui = Instance.new("ScreenGui")\n'
    code += 'ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")\n\n'

    elements.forEach((element) => {
      const props = element.properties
      code += `local ${element.name} = Instance.new("${element.type}")\n`
      code += `${element.name}.Name = "${element.name}"\n`
      code += `${element.name}.Size = UDim2.new(0, ${element.width}, 0, ${element.height})\n`
      code += `${element.name}.Position = UDim2.new(0, ${element.x}, 0, ${element.y})\n`
      code += `${element.name}.BackgroundColor3 = Color3.fromRGB(${props.BackgroundColor3.R}, ${props.BackgroundColor3.G}, ${props.BackgroundColor3.B})\n`
      code += `${element.name}.BackgroundTransparency = ${props.BackgroundTransparency}\n`

      if (props.Text) {
        code += `${element.name}.Text = "${props.Text}"\n`
        if (props.TextColor3) {
          code += `${element.name}.TextColor3 = Color3.fromRGB(${props.TextColor3.R}, ${props.TextColor3.G}, ${props.TextColor3.B})\n`
        }
        if (props.TextSize) {
          code += `${element.name}.TextSize = ${props.TextSize}\n`
        }
      }

      code += `${element.name}.Parent = ScreenGui\n\n`
    })

    return code
  }

  const selectedElementData = elements.find((el) => el.id === selectedElement)

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Roblox UI Designer</h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Button variant={showGrid ? "default" : "outline"} size="sm" onClick={() => setShowGrid(!showGrid)}>
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant={snapToGrid ? "default" : "outline"} size="sm" onClick={() => setSnapToGrid(!snapToGrid)}>
              <Move className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={previewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Test
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-card border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-sm mb-3">Elements</h2>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => addElement("Frame")} className="text-xs">
                Frame
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("TextLabel")} className="text-xs">
                TextLabel
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("TextButton")} className="text-xs">
                TextButton
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("TextBox")} className="text-xs">
                TextBox
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("ImageLabel")} className="text-xs">
                ImageLabel
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("ScrollingFrame")} className="text-xs">
                ScrollFrame
              </Button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="flex items-center text-sm font-medium text-muted-foreground mb-3">
                <Folder className="w-4 h-4 mr-2" />
                ScreenGui
              </div>
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    selectedElement === element.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2 opacity-70" />
                    <span className="text-sm">{element.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteElement(element.id)
                    }}
                    className="w-6 h-6 p-0 opacity-70 hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-auto bg-muted/20">
            <div
              ref={canvasRef}
              className="relative w-full h-full min-h-[600px] bg-white rounded-lg shadow-sm border border-border"
              style={{
                backgroundImage: showGrid
                  ? `radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`
                  : undefined,
                backgroundSize: showGrid ? `${gridSize}px ${gridSize}px` : undefined,
              }}
              onClick={() => setSelectedElement(null)}
            >
              {elements.map((element) => (
                <div
                  key={element.id}
                  style={getElementStyle(element)}
                  className={`${selectedElement === element.id ? "ring-2 ring-blue-500 ring-offset-1" : ""}`}
                  onMouseDown={(e) => handleMouseDown(e, element.id)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedElement(element.id)
                  }}
                >
                  {element.properties.Text && <span className="pointer-events-none">{element.properties.Text}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-80 bg-card border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-sm">Properties</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {selectedElementData ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <Input
                    value={selectedElementData.name}
                    onChange={(e) => updateProperty(selectedElementData.id, "name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium">Width</Label>
                    <Input
                      type="number"
                      value={selectedElementData.width}
                      onChange={(e) => {
                        const newWidth = Number.parseInt(e.target.value) || 100
                        setElements(
                          elements.map((el) => (el.id === selectedElementData.id ? { ...el, width: newWidth } : el)),
                        )
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Height</Label>
                    <Input
                      type="number"
                      value={selectedElementData.height}
                      onChange={(e) => {
                        const newHeight = Number.parseInt(e.target.value) || 50
                        setElements(
                          elements.map((el) => (el.id === selectedElementData.id ? { ...el, height: newHeight } : el)),
                        )
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Background Color</Label>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">R</Label>
                        <Slider
                          value={[selectedElementData.properties.BackgroundColor3.R]}
                          onValueChange={([value]) =>
                            updateProperty(selectedElementData.id, "BackgroundColor3.R", value)
                          }
                          min={0}
                          max={255}
                          step={1}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">G</Label>
                        <Slider
                          value={[selectedElementData.properties.BackgroundColor3.G]}
                          onValueChange={([value]) =>
                            updateProperty(selectedElementData.id, "BackgroundColor3.G", value)
                          }
                          min={0}
                          max={255}
                          step={1}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">B</Label>
                        <Slider
                          value={[selectedElementData.properties.BackgroundColor3.B]}
                          onValueChange={([value]) =>
                            updateProperty(selectedElementData.id, "BackgroundColor3.B", value)
                          }
                          min={0}
                          max={255}
                          step={1}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Transparency</Label>
                  <Slider
                    value={[selectedElementData.properties.BackgroundTransparency]}
                    onValueChange={([value]) => updateProperty(selectedElementData.id, "BackgroundTransparency", value)}
                    min={0}
                    max={1}
                    step={0.01}
                    className="mt-2"
                  />
                </div>

                {selectedElementData.properties.Text !== undefined && (
                  <>
                    <div>
                      <Label className="text-sm font-medium">Text</Label>
                      <Input
                        value={selectedElementData.properties.Text}
                        onChange={(e) => updateProperty(selectedElementData.id, "Text", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Text Size</Label>
                      <Input
                        type="number"
                        value={selectedElementData.properties.TextSize || 18}
                        onChange={(e) =>
                          updateProperty(selectedElementData.id, "TextSize", Number.parseInt(e.target.value) || 18)
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Font</Label>
                      <Select
                        value={selectedElementData.properties.Font || "SourceSans"}
                        onValueChange={(value) => updateProperty(selectedElementData.id, "Font", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(ROBLOX_FONTS).map((font) => (
                            <SelectItem key={font} value={font}>
                              {font}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedElementData.properties.TextColor3 && (
                      <div>
                        <Label className="text-sm font-medium">Text Color</Label>
                        <div className="mt-2 space-y-2">
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label className="text-xs">R</Label>
                              <Slider
                                value={[selectedElementData.properties.TextColor3.R]}
                                onValueChange={([value]) =>
                                  updateProperty(selectedElementData.id, "TextColor3.R", value)
                                }
                                min={0}
                                max={255}
                                step={1}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">G</Label>
                              <Slider
                                value={[selectedElementData.properties.TextColor3.G]}
                                onValueChange={([value]) =>
                                  updateProperty(selectedElementData.id, "TextColor3.G", value)
                                }
                                min={0}
                                max={255}
                                step={1}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">B</Label>
                              <Slider
                                value={[selectedElementData.properties.TextColor3.B]}
                                onValueChange={([value]) =>
                                  updateProperty(selectedElementData.id, "TextColor3.B", value)
                                }
                                min={0}
                                max={255}
                                step={1}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Visible</Label>
                  <Switch
                    checked={selectedElementData.properties.Visible}
                    onCheckedChange={(checked) => updateProperty(selectedElementData.id, "Visible", checked)}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <MousePointer className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select an element to edit properties</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-48 border-t border-border bg-card">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="font-semibold text-sm flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Generated Lua Code
          </h3>
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generateLuaCode())}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
        <div className="p-3 h-full overflow-auto">
          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap bg-muted/50 p-3 rounded">
            {generateLuaCode()}
          </pre>
        </div>
      </div>
    </div>
  )
}
