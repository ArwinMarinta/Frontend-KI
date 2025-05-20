import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./applications/users/home/home";
// import Submission from "./applications/users/submission/page/submission";
import Files from "./applications/users/files/page/files";
import Faq from "./applications/users/faq/page/faq";
import Contact from "./applications/users/contact_us/page/contact";
import Notification from "./applications/users/notifications/notification";
import Login from "./applications/authentication/login/login";
import Register from "./applications/authentication/register/register";
import ForgotPassword from "./applications/authentication/forgotPassword/forgotPassword";
import RessetPassword from "./applications/authentication/forgotPassword/ressetPassword";
import VerifyEmail from "./applications/authentication/register/verifyEmail";
import UserProfile from "./applications/users/profile/userProfile";
import SubmissionHistory from "./applications/users/submissionHistory/page/submissionHistory";
import Assignment from "./applications/users/assignment/page/reviewerAssignment";
import ChangePassword from "./applications/authentication/changePassoword/changePassword";

import SubmissionDetail from "./applications/users/submissionHistory/page/submissionDetail";
import SubmissionComplete from "./applications/users/submission/page/submissionComplete";

//url admin
import Dashboard from "./applications/admins/dashboard/page/dashboard";
import SubmissionCopyright from "./applications/admins/submission/page/submissionCopyright";
import SubmissionPatent from "./applications/admins/submission/page/submissionPatent";
import SubmissionIndustrialDesign from "./applications/admins/submission/page/submissionIndustrialDesign";
import SubmissionBrand from "./applications/admins/submission/page/submissionBrand";
import IprCategory from "./applications/admins/category/page/iprCategory";
import PatentCategory from "./applications/admins/category/page/patentCategory";
import BrandCategory from "./applications/admins/category/page/brandCategory";
import IndustrialDesignCategory from "./applications/admins/category/page/industrialDesignCategory";
import CopyrightCategory from "./applications/admins/category/page/copyrightCategory";
import ManageCategoryFaq from "./applications/admins/managements/pages/manageCategoryFaq";
import ManageDownload from "./applications/admins/managements/pages/manageDownload";
import ManageYearsFunding from "./applications/admins/managements/pages/manageYearsFunding";
import ManageTermConditionalFunding from "./applications/admins/managements/pages/manageTermConditionalFunding";
import ReportsAnalitic from "./applications/admins/informations/page/reportsAnalitic";
import HelpCenter from "./applications/admins/informations/page/helpCenter";
import LogActivity from "./applications/admins/informations/page/logActivity";
import Account from "./applications/admins/settings/account";
import PageTitle from "./utils/pagesTitle";
import NotFound from "./applications/notfound/notFound";
import CreateAccount from "./applications/admins/settings/createAccount";
import DetailAccount from "./applications/admins/settings/detailAccount";
import ManageSubFaq from "./applications/admins/managements/pages/manageFaq";
import UpdateAccount from "./applications/admins/settings/updateAccount";
import ManageCategoryDownload from "./applications/admins/managements/pages/manageCategoryDownload";
import ManageGroup from "./applications/admins/managements/pages/manageGroup";
import ManageQuota from "./applications/admins/managements/pages/manageQuota";
import SubCopyrightCategory from "./applications/admins/category/page/subCopyrightCategory";
import SubIndustrialDesign from "./applications/admins/category/page/subIndustrialDesign";
import ReplyHelpCenter from "./applications/admins/informations/page/replyHelpCenter";
import ProfileAdmin from "./applications/admins/profile/page/profile";
import ProgresSubmission from "./applications/admins/submission/page/progresSubmission";
import DetailSubmission from "./applications/admins/submission/page/detailSubmission";
import SubmissionProgress from "./applications/users/submissionHistory/page/submissionProgress";
import ReviewerProgress from "./applications/users/assignment/page/reviewerProgress";
import ReviewerUpdateProgres from "./applications/users/assignment/page/reviewerUpdateProgres";
// import SubmissionUpdate from "./applications/users/submissionHistory/page/submissionUpdate";
import SubmissionUserCopytight from "./applications/users/submission/page/submissionUserCopytight";
import DashboardUser from "./applications/users/submission/page/dashboardUser";
import SubmissionUserPaten from "./applications/users/submission/page/submissionUserPaten";
import SubmissionUserBrand from "./applications/users/submission/page/submissionUserBrand";
import SubmissionUserIndusDesign from "./applications/users/submission/page/submissionUserIndusDesign";
import ProtectedToken from "./middleware/protecdToken";
import NoAccessToken from "./middleware/noAccessToken";
import ProtectedRouteRole from "./middleware/protecdRole";
import UpdateSubmissionProgress from "./applications/admins/submission/page/updateSubmissionProgress";

function App() {
  return (
    <BrowserRouter>
      <PageTitle />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/pengajuan" element={<Submission />} /> */}
        <Route path="/unduhan" element={<Files />} />
        <Route path="/frequently-asked-question" element={<Faq />} />
        <Route path="/hubungi-kami" element={<Contact />} />
        {/* <Route path="/notifikasi" element={<Notification />} /> */}
        <Route
          path="/login"
          element={
            <ProtectedToken>
              <Login />
            </ProtectedToken>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedToken>
              <Register />
            </ProtectedToken>
          }
        />

        <Route
          path="/lupa-kata-sandi"
          element={
            <ProtectedToken>
              <ForgotPassword />
            </ProtectedToken>
          }
        />

        <Route
          path="/resset-password/:token"
          element={
            <ProtectedToken>
              <RessetPassword />
            </ProtectedToken>
          }
        />

        <Route
          path="/verify-email"
          element={
            <ProtectedToken>
              <VerifyEmail />
            </ProtectedToken>
          }
        />

        <Route element={<ProtectedRouteRole allowedRoles={["user", "reviewer"]} />}>
          <Route
            path="/dashboard/pengajuan"
            element={
              <NoAccessToken>
                <DashboardUser />
              </NoAccessToken>
            }
          />
          <Route
            path="/pengajuan/hak-cipta"
            element={
              <NoAccessToken>
                <SubmissionUserCopytight />
              </NoAccessToken>
            }
          />
          <Route
            path="/pengajuan/paten"
            element={
              <NoAccessToken>
                <SubmissionUserPaten />
              </NoAccessToken>
            }
          />
          <Route
            path="/pengajuan/merek"
            element={
              <NoAccessToken>
                <SubmissionUserBrand />
              </NoAccessToken>
            }
          />
          <Route
            path="/pengajuan/desain-industri"
            element={
              <NoAccessToken>
                <SubmissionUserIndusDesign />
              </NoAccessToken>
            }
          />

          {/* history */}

          <Route
            path="/histori-pengajuan/progress"
            element={
              <NoAccessToken>
                <SubmissionProgress />
              </NoAccessToken>
            }
          />
          <Route
            path="/histori-pengajuan/detail"
            element={
              <NoAccessToken>
                <SubmissionDetail />
              </NoAccessToken>
            }
          />
          {/* <Route
            path="/histori-pengajuan/ubah"
            element={
              <NoAccessToken>
                <SubmissionUpdate />
              </NoAccessToken>
            }
          /> */}
          <Route
            path="/lengkapi-berkas-pengajuan"
            element={
              <NoAccessToken>
                <SubmissionComplete />
              </NoAccessToken>
            }
          />
          <Route
            path="/histori-pengajuan/:type"
            element={
              <NoAccessToken>
                <SubmissionHistory />
              </NoAccessToken>
            }
          />
          <Route
            path="/notifikasi"
            element={
              <NoAccessToken>
                <Notification />
              </NoAccessToken>
            }
          />
        </Route>

        <Route element={<ProtectedRouteRole allowedRoles={["reviewer"]} />}>
          <Route
            path="/penugasan"
            element={
              <NoAccessToken>
                <Assignment />
              </NoAccessToken>
            }
          />
          <Route
            path="/penugasan/progress"
            element={
              <NoAccessToken>
                <ReviewerProgress />
              </NoAccessToken>
            }
          />
          <Route
            path="/penugasan/progress/ubah"
            element={
              <NoAccessToken>
                <ReviewerUpdateProgres />
              </NoAccessToken>
            }
          />
        </Route>

        <Route element={<ProtectedRouteRole allowedRoles={["user", "reviewer", "admin", "superAdmin"]} />}>
          <Route
            path="/profile"
            element={
              <NoAccessToken>
                <UserProfile />
              </NoAccessToken>
            }
          />

          <Route
            path="/ubah-password"
            element={
              <NoAccessToken>
                <ChangePassword />
              </NoAccessToken>
            }
          />
        </Route>

        <Route element={<ProtectedRouteRole allowedRoles={["admin", "superAdmin"]} />}>
          <Route
            path="/ubah-password"
            element={
              <NoAccessToken>
                <ChangePassword />
              </NoAccessToken>
            }
          />
          <Route
            path="/dashboard"
            element={
              <NoAccessToken>
                <Dashboard />
              </NoAccessToken>
            }
          />

          {/* permohonan */}
          <Route
            path="/permohonan/hak-cipta"
            element={
              <NoAccessToken>
                <SubmissionCopyright />
              </NoAccessToken>
            }
          />
          <Route
            path="/permohonan/paten"
            element={
              <NoAccessToken>
                <SubmissionPatent />
              </NoAccessToken>
            }
          />
          <Route
            path="/permohonan/merek"
            element={
              <NoAccessToken>
                <SubmissionBrand />
              </NoAccessToken>
            }
          />
          <Route
            path="/permohonan/desain-industri"
            element={
              <NoAccessToken>
                <SubmissionIndustrialDesign />
              </NoAccessToken>
            }
          />
          <Route
            path="/permohonan/:name/progres"
            element={
              <NoAccessToken>
                <ProgresSubmission />
              </NoAccessToken>
            }
          />
          <Route
            path="/permohonan/:name/progres/ubah"
            element={
              <NoAccessToken>
                <UpdateSubmissionProgress />
              </NoAccessToken>
            }
          />
          <Route
            path="/permohonan/:name/detail"
            element={
              <NoAccessToken>
                <DetailSubmission />
              </NoAccessToken>
            }
          />
          <Route
            path="/permohonan/:name/progres"
            element={
              <NoAccessToken>
                <ProgresSubmission />
              </NoAccessToken>
            }
          />

          {/* Kategori dan jenis kekayaan intelektual */}
          <Route
            path="/kategori/kekayaan-intelektual"
            element={
              <NoAccessToken>
                <IprCategory />
              </NoAccessToken>
            }
          />
          <Route
            path="/kategori/hak-cipta"
            element={
              <NoAccessToken>
                <CopyrightCategory />
              </NoAccessToken>
            }
          />
          <Route
            path="/kategori/hak-cipta/:ids/sub-jenis"
            element={
              <NoAccessToken>
                <SubCopyrightCategory />
              </NoAccessToken>
            }
          />
          <Route
            path="/kategori/paten"
            element={
              <NoAccessToken>
                <PatentCategory />
              </NoAccessToken>
            }
          />
          <Route
            path="/kategori/merek"
            element={
              <NoAccessToken>
                <BrandCategory />
              </NoAccessToken>
            }
          />
          <Route
            path="/kategori/desain-industri"
            element={
              <NoAccessToken>
                <IndustrialDesignCategory />
              </NoAccessToken>
            }
          />
          <Route
            path="/kategori/desain-industri/:ids/sub-jenis"
            element={
              <NoAccessToken>
                <SubIndustrialDesign />
              </NoAccessToken>
            }
          />

          {/* Pendanaan */}
          <Route
            path="/manajemen/tahun/pendanaan"
            element={
              <NoAccessToken>
                <ManageYearsFunding />
              </NoAccessToken>
            }
          />
          <Route
            path="/manajemen/tahun/pendanaan/:years"
            element={
              <NoAccessToken>
                <ManageGroup />
              </NoAccessToken>
            }
          />
          <Route
            path="/manajemen/tahun/pendanaan/:years/quota/:group"
            element={
              <NoAccessToken>
                <ManageQuota />
              </NoAccessToken>
            }
          />

          {/* FAQ */}
          <Route
            path="/manajemen/kategori/faq"
            element={
              <NoAccessToken>
                <ManageCategoryFaq />
              </NoAccessToken>
            }
          />
          <Route
            path="/manajemen/kategori/faq/:name"
            element={
              <NoAccessToken>
                <ManageSubFaq />
              </NoAccessToken>
            }
          />

          {/* Unduhan */}
          <Route
            path="/manajemen/kategori/unduhan"
            element={
              <NoAccessToken>
                <ManageCategoryDownload />
              </NoAccessToken>
            }
          />
          <Route
            path="/manajemen/kategori/unduhan/:name"
            element={
              <NoAccessToken>
                <ManageDownload />
              </NoAccessToken>
            }
          />

          {/* Syarat dan ketentuan */}
          <Route
            path="/manajemen/syarat-ketentuan-pendanaan"
            element={
              <NoAccessToken>
                <ManageTermConditionalFunding />
              </NoAccessToken>
            }
          />

          {/* Pusat Bantuan */}
          <Route
            path="/informasi/pusat-bantuan"
            element={
              <NoAccessToken>
                <HelpCenter />
              </NoAccessToken>
            }
          />
          <Route
            path="/informasi/pusat-bantuan/balas/:ids"
            element={
              <NoAccessToken>
                <ReplyHelpCenter />
              </NoAccessToken>
            }
          />
          <Route
            path="/informasi/laporan-analisis"
            element={
              <NoAccessToken>
                <ReportsAnalitic />
              </NoAccessToken>
            }
          />
          <Route
            path="/informasi/log-aktivitas"
            element={
              <NoAccessToken>
                <LogActivity />
              </NoAccessToken>
            }
          />

          {/* Profile Admin */}
          <Route
            path="/profile/admin"
            element={
              <NoAccessToken>
                <ProfileAdmin />
              </NoAccessToken>
            }
          />
        </Route>

        <Route element={<ProtectedRouteRole allowedRoles={["superAdmin"]} />}>
          {/* Pengaturan akun */}
          <Route
            path="/pengaturan/akun"
            element={
              <NoAccessToken>
                <Account />
              </NoAccessToken>
            }
          />
          <Route
            path="/pengaturan/akun/detail/user"
            element={
              <NoAccessToken>
                <DetailAccount />
              </NoAccessToken>
            }
          />
          <Route
            path="/pengaturan/akun/tambah/user"
            element={
              <NoAccessToken>
                <CreateAccount />
              </NoAccessToken>
            }
          />
          <Route
            path="/pengaturan/akun/ubah/user"
            element={
              <NoAccessToken>
                <UpdateAccount />
              </NoAccessToken>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
