import '@fortawesome/fontawesome-free/css/all.min.css';
import "./styles/auth.scss";
import "./styles/appLayout.scss";
import "./styles/styles.scss";
import "./styles/global.scss";
import { Toaster } from "react-hot-toast";
import LiveSupport from '@/components/liveSupport/LiveSupport';
import favicon from "@/public/favicon.png";

export const metadata = {
  title: "Welcome - Truevalue",
  description: "",
  icons: {
    icon: {
      url: { favicon },
      type: "image/png",
    },
    shortcut: { url: "/favicon.png", type: "image/png" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "20px",
              fontWeight: "600",
              border: "1px solid #00000017"
            }
          }}
        />
        <div className="platform-layout-parent">
          <div className="platform-layout-childs">
            {children}
          </div>
        </div>
        {/* <LiveSupport /> */}
      </body>
    </html>
  );
}
