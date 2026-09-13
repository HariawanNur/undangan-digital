import { useState } from "react";
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
  const guestName = useGuestName();

  return (
    <ToastProvider>
      <MusicProvider active={opened}>
        <div className={styles.stage}>
          <Cover guestName={guestName} opened={opened} onOpen={() => setOpened(true)} />

          <main className={`${styles.main} ${opened ? styles.show : ""}`}>
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
