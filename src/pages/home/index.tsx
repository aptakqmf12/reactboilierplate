import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Window from "@components/layout/windowLib";
import WindowCustom from "@components/layout/windowCustom";
export default function Home() {
  return (
    <div.wrap>
      <WindowCustom>fwqnfq</WindowCustom>
      {/* <AnimatePresence></AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring" }}
        animate={{ opacity: 1 }}
        drag
        dragConstraints={{
          top: -10,
          right: -10,
          bottom: -10,
          left: -10,
        }}
        style={{ width: 100, height: 100, border: "1px red solid" }}
      ></motion.div> */}
    </div.wrap>
  );
}

const div = {
  wrap: styled.div`
    padding: 20px;
    color: ${({ theme: { isDesktop } }) => (isDesktop ? "red" : "blue")};
  `,

  box: styled.div`
    width: 200px;
    height: 200px;
    border: 1px red dashed;
  `,
};
