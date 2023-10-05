import { HeaderBar } from './components/HeaderBar';
import { ImageGallery } from './components/ImageGallery';

export const App = () => {
  return (
    <>
      <HeaderBar />
      <main className="app__homepage">
        <ImageGallery />
      </main>
    </>
  );
};
