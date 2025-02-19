"use client"

import s from "./animated-button.module.css"

import cn from "clsx"
import { ArrowRight } from "lucide-react"
import { MotionProps, motion } from "motion/react"
import { useState } from "react"

interface AnimatedButtonProps {
  size?: "sm" | "md" | "lg"
  text: string
  theme?: "primary" | "secondary"
}

export function AnimatedButton({ size = "md", text = "Button Text", theme = "primary" }: AnimatedButtonProps) {
  const [isOn, setIsOn] = useState(false)
  const toggleSwitch = () => setIsOn(!isOn)

  const transition: MotionProps["transition"] = {
    type: "tween",
    duration: 0.4,
    ease: [0.785, 0.135, 0.15, 0.86],
  }

  const themes = {
    primary: {
      c1: "--white",
      c2: "--bricky-brick",
    },
    secondary: {
      c1: "--bricky-brick",
      c2: "--white",
    },
  }

  return (
    <span
      className={cn(s.button, "blur-bg-white", "test flex items-center justify-center cursor-pointer", {
        [s.sm]: size === "sm",
        [s.md]: size === "md",
        [s.lg]: size === "lg",
      })}
      onMouseEnter={toggleSwitch}
      onMouseLeave={toggleSwitch}
    >
      <span
        className={cn("relative w-full h-full flex items-center", {
          "justify-center": isOn,
          "justify-start": !isOn,
        })}
      >
        {/* text */}
        <motion.span
          className={cn("z-20 relative")}
          initial={{
            color: `var(${themes[theme].c2})`,
          }}
          animate={{
            color: isOn ? `var(${themes[theme].c1})` : `var(${themes[theme].c2})`,
          }}
          layout
          transition={transition}
        >
          {/* icon left */}
          <span
            className={cn(
              s.iconC,
              "absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full flex items-center justify-center flex-shrink-0 z-20"
            )}
          >
            <motion.span
              className="block"
              initial={{
                x: "-600%",
              }}
              animate={{
                x: isOn ? 0 : "-600%",
              }}
              transition={{
                ...transition,
                duration: 1,
              }}
            >
              <ArrowRight
                className={cn(s.icon, {
                  "text-bricky-brick": theme === "secondary",
                  "text-white": theme === "primary",
                })}
              />
            </motion.span>
          </span>
          <span className="translate-y-[2px]">{text}</span>
        </motion.span>
      </span>
      {/* background */}
      <motion.span
        className={cn(s["bg"], "absolute block w-full h-full translate-y-full z-10", {
          "bg-bricky-brick": theme === "primary",
          "bg-white": theme === "secondary",
        })}
        initial={{
          y: "100%",
        }}
        animate={{
          y: isOn ? 0 : "100%",
        }}
        transition={transition}
      ></motion.span>
      {/* icon right */}
      <motion.span
        className={cn(
          s.iconC,
          "absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center flex-shrink-0"
        )}
      >
        <motion.span
          className="block"
          animate={{
            x: isOn ? "200%" : 0,
          }}
          transition={transition}
        >
          <ArrowRight
            className={cn(s.icon, {
              "text-bricky-brick": theme === "primary",
              "text-white": theme === "secondary",
            })}
          />
        </motion.span>
      </motion.span>
    </span>
  )
}
