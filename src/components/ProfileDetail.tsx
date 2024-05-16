const ProfileDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-start">
    <div className="w-full">
      <p className="pb-2 pt-5 text-left font-nunito text-sm font-normal leading-3">
        Your <strong className="font-semibold">{` ${label} `}</strong>
      </p>
    </div>
    <div className="flex h-11 w-[296px] flex-col justify-center rounded-[8px] bg-[#F4F4F4] p-4 text-left font-nunito text-[12px] font-normal leading-3">
      {' '}
      {value}
    </div>
  </div>
);

export default ProfileDetail;
