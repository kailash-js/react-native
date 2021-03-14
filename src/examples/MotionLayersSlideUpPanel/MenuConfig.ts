import {ImageAssets} from '@assets';

const MenuItemsDataSource = [
  {
    menuItemId: 'feedback',
    title: 'Feedback',
    description:
      'Please tell us what should we do to improve this app, we are here to listen your voice.',
    icon: ImageAssets.menuIcons.feedback,
  },
  {
    menuItemId: 'share',
    title: 'Share',
    description:
      "Share this app to friends, they're going to very ahppy for your sharing.",
    icon: ImageAssets.menuIcons.share,
  },
  {
    menuItemId: 'rate-review',
    title: 'Rate this app',
    description: 'Let the world know your rating for this app',
    icon: ImageAssets.menuIcons.rate,
  },
  {
    menuItemId: 'about',
    title: 'About',
    description: 'A quick introduction about this app.',
    icon: ImageAssets.menuIcons.about,
  },
];

export {MenuItemsDataSource};
