import Link from 'next/link';
import Image from 'next/image';
import footer from '@/public/svgs/footer';

const Footer = () => {
  const urls = {
    github: 'https://github.com/yuminn-k/project_freee-attendance-keeper',
  };
  return (
    <div className="py-7 flex justify-center">
      <div className="w-max flex justify-center items-center">
        <div className="text-gray-500 leading-tight">
          <span className="text-sm">Copyright © yuminn-k</span>
          <br />
          <span className="text-gray-500 text-xs">gimyumin40@gmail.com</span>
        </div>
        <ul className="flex pl-3">
          <li>
            <Link href={urls.github}>
              <Image src={footer.github} width={50} height={50} alt="github" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
