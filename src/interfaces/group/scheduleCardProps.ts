import {RoleProps} from '.';

interface ScheduleCardProps extends RoleProps {
  scheduleName: string;
  time: string;
  managerRole: boolean;
  onMoreVertClick: () => void;
}

export default ScheduleCardProps;
