import service from '@/api/interceptor';

// 获取公告列表
export const getNoticeList = () => service.get('/api/ojProblem/getNotice');
// 获取当前用户的权限
export const getUserPermission = id =>
  service.get('/api/ojProblem/getPermission', { params: { id } });
// 新增公告
export const addNotice = data => service.post('/api/ojProblem/insertNotice', data);
// 查询单个公告
export const getNotice = id =>
  service.get('/api/ojProblem/getNoticeById', { params: { id } });
// 查询用户头像、昵称、总提交数和当天提交数
export const getHotUser = () => service.get('/api/ojProblem/getHotUser');
// 查询当前用户的除排名以外的头像、昵称、总提交数和当前提交数
export const getCurrentUserRankingOther = id =>
  service.get('/api/ojProblem/getCurrentUserRankingOther', { params: { id } });
// 查询当前用户的排名，以百分比形式显示
export const getCurrentUserRanking = id =>
  service.get('/api/ojProblem/getCurrentUserRanking', { params: { id } });
