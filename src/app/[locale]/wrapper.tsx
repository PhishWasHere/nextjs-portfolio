'use client'
// template.tsx is a bit fucked and has been since v13 was released so i cant use it normally
  // and now i need to do this ghetto thing which breaks the loading.tsx
    // will probably need to do some more idiotic things to get the loading component to work
      // thanks @Apezdr for creating this fix https://stackoverflow.com/users/2716466/apezdr
        // https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion/77715364#77715364

import { PropsWithChildren, useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/navigation";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

export default function Wrapper ({ children }: PropsWithChildren) {
  const path = usePathname();
  return (
    <AnimatePresence mode='wait'>
      <motion.div key={path}>
        <FrozenRouter>
          {children}
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
};