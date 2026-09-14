import { useEffect, useRef, useState } from "react";
import Cover from "./components/Cover";
import OpeningQuote from "./components/OpeningQuote";
import EventCountdown from "./components/EventCountdown";
import Couple from "./components/Couple";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import Doa from "./components/Doa";
import Rsvp from "./components/Rsvp";
import GiftSection from "./components/GiftSection";
import Thanks from "./components/Thanks";
import { ToastProvider } from "./components/Toast";
import { MusicProvider } from "./components/Music";
import { useGuestName } from "./hooks/useGuestName";
import styles from "./App.module.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const mainRef = useRef(null);
  const guestName = useGuestName();

  useEffect(() => {
    document.body.classList.toggle("invitation-open", opened);
    return () => document.body.classList.remove("invitation-open");
  }, [opened]);

  function openInvitation() {
    setOpened(true);
    window.requestAnimationFrame(() => {
      mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      mainRef.current?.focus({ preventScroll: true });
    });
  }

  return (
    <ToastProvider>
      <MusicProvider active={opened}>
        <div className={styles.stage}>
          <Cover guestName={guestName} opened={opened} onOpen={openInvitation} />

          <main
            ref={mainRef}
            id="undangan"
            tabIndex={-1}
            className={`${styles.main} ${opened ? styles.show : ""}`}
          >
            <OpeningQuote />
            <EventCountdown />
            <Couple />
            <EventDetails />
            <Gallery />
            <Doa />
            <Rsvp />
            <GiftSection />
            <Thanks />
          </main>
        </div>
      </MusicProvider>
    </ToastProvider>
  );
}
