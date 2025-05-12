import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./applications/users/home/home";
import Submission from "./applications/users/submission/page/submission";
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
import Dashboard from "./applications/admins/dashboard/dashboard";
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

function App() {
  return (
    <BrowserRouter>
      <PageTitle />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/pengajuan" element={<Submission />} />
        <Route path="/unduhan" element={<Files />} />
        <Route path="/frequently-asked-question" element={<Faq />} />
        <Route path="/hubungi-kami" element={<Contact />} />
        <Route path="/notifikasi" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-kata-sandi" element={<ForgotPassword />} />
        <Route path="/resset-password/:token" element={<RessetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/histori-pengajuan" element={<SubmissionHistory />} />
        <Route path="/penugasan" element={<Assignment />} />
        <Route path="/penugasan/progress/:id" element={<ReviewerProgress />} />
        <Route path="/penugasan/progress/ubah/:id" element={<ReviewerUpdateProgres />} />
        <Route path="/ubah-password" element={<ChangePassword />} />
        <Route path="/histori-pengajuan/progress/:id" element={<SubmissionProgress />} />
        <Route path="/histori-pengajuan/detail/:id" element={<SubmissionDetail />} />
        <Route path="/lengkapi-berkas-pengajuan" element={<SubmissionComplete />} />

        {/* url admin */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* permohonan */}
        <Route path="/permohonan/hak-cipta" element={<SubmissionCopyright />} />
        <Route path="/permohonan/paten" element={<SubmissionPatent />} />
        <Route path="/permohonan/merek" element={<SubmissionBrand />} />
        <Route path="/permohonan/desain-industri" element={<SubmissionIndustrialDesign />} />
        <Route path="/permohonan/jenis/progres" element={<ProgresSubmission />} />
        <Route path="/permohonan/:name/detail/:id" element={<DetailSubmission />} />
        <Route path="/permohonan/:name/progres/:id" element={<ProgresSubmission />} />

        {/* Kategori dan jenis kekayaan intelektual */}
        <Route path="/kategori/kekayaan-intelektual" element={<IprCategory />} />
        <Route path="/kategori/hak-cipta" element={<CopyrightCategory />} />
        <Route path="/kategori/hak-cipta/:ids/sub-jenis" element={<SubCopyrightCategory />} />
        <Route path="/kategori/paten" element={<PatentCategory />} />
        <Route path="/kategori/merek" element={<BrandCategory />} />
        <Route path="/kategori/desain-industri" element={<IndustrialDesignCategory />} />
        <Route path="/kategori/desain-industri/:ids/sub-jenis" element={<SubIndustrialDesign />} />
        {/* Pendanaan */}
        <Route path="/manajemen/tahun/pendanaan" element={<ManageYearsFunding />} />
        <Route path="/manajemen/tahun/pendanaan/:years" element={<ManageGroup />} />
        <Route path="/manajemen/tahun/pendanaan/:years/quota/:group" element={<ManageQuota />} />
        {/* FAQ */}
        <Route path="/manajemen/kategori/faq" element={<ManageCategoryFaq />} />
        <Route path="/manajemen/kategori/faq/:name" element={<ManageSubFaq />} />
        {/* Unduhan */}
        <Route path="/manajemen/kategori/unduhan/:name" element={<ManageDownload />} />
        <Route path="/manajemen/kategori/unduhan" element={<ManageCategoryDownload />} />
        {/* syarat dan ketentuan */}
        <Route path="/manajemen/syarat-ketentuan-pendanaan" element={<ManageTermConditionalFunding />} />

        {/* Pusat Bantuan */}
        <Route path="/informasi/pusat-bantuan" element={<HelpCenter />} />
        <Route path="/informasi/pusat-bantuan/balas/:ids" element={<ReplyHelpCenter />} />

        <Route path="/informasi/laporan-analisis" element={<ReportsAnalitic />} />

        <Route path="/informasi/log-aktivitas" element={<LogActivity />} />
        {/* pengaturan akun */}
        <Route path="/pengaturan/akun" element={<Account />} />
        <Route path="/pengaturan/akun/detail/user" element={<DetailAccount />} />
        <Route path="/pengaturan/akun/tambah/user" element={<CreateAccount />} />
        <Route path="/pengaturan/akun/ubah/user" element={<UpdateAccount />} />

        {/* Profile Admin */}
        <Route path="/profile/admin" element={<ProfileAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
