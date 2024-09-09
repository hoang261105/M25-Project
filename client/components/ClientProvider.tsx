"use client"; // Đánh dấu đây là Client Component

import { Provider } from "react-redux";
import store from "@/stores/store"; // Đảm bảo đường dẫn đến store là chính xác

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
